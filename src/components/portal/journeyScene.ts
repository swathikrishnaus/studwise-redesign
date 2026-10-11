import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { clamp, lerp, smoothstep } from "@/lib/scroll";
import { buildCampus, CAMPUS_LAWN, rng } from "./campus";

/* ==========================================================================
   Journey scene — "The Staircase to a New Future" (Three.js)
   ==========================================================================
   One world, one camera, one progress value (0 → 1):

     0.00–0.20  Blue hour. A student (Studwise backpack) stands at the
                foot of an illuminated staircase; the camera eases forward.
     0.20–0.45  The camera climbs with the stairs as dawn breaks.
     0.45–0.70  The stairs rise into a cloud bank (public/images/cloud.png)
                and the camera breaks out above a sea of clouds; the
                campus starts to show through gaps ahead.
     0.70–0.90  The camera descends from the aerial view to the campus.
     0.90–1.00  Daylight. The same student walks up the avenue toward the
                main hall's entrance.

   The camera follows Catmull-Rom splines keyed to progress; light, sky,
   fog and clouds are keyed the same way, so everything stays in step and
   plays back exactly in reverse.

   Units are metres. Rendering is on demand.
   ========================================================================== */

const CAMPUS_Z = -400; // the campus entrance, straight ahead of the stairs

type V3 = [number, number, number];

// Camera keyframes: progress → [position, look-at]
const CAMERA: [number, V3, V3][] = [
  [0.0, [1.2, 1.7, 7.5], [0, 2.3, -4]],
  [0.2, [0.9, 3.0, 4.4], [0, 6.8, -12]], // behind and above the student
  [0.33, [0.3, 13, -18], [0, 23, -42]],
  [0.45, [0, 29, -47], [0, 42, -80]],
  [0.58, [0, 56, -110], [0, 63, -170]],
  [0.7, [0, 80, -200], [0, 42, -330]],
  [0.8, [4, 50, -302], [0, 10, -412]],
  [0.9, [5, 11, -376], [0, 4, -425]],
  [0.96, [1.8, 2.6, -399], [0, 6.2, -432]],
  // Settles a comfortable distance behind the student (about 10 m): the
  // backpack emblem reads, with the avenue and main hall around them
  [1.0, [1.5, 2.6, -401.5], [0.1, 2.6, -426]],
];

// Light keys — night → dawn → daylight
const LIGHT_P = [0, 0.22, 0.45, 0.62, 0.82, 1];
// Opens in the brand's blue hour (like the hero sky), never near-black
const LIGHT = {
  skyTop: ["#0a5687", "#0c5f95", "#2a6ea8", "#3d82c2", "#169fdc", "#0f9bd7"],
  horizon: ["#5fb2dd", "#6fbbe2", "#efb88f", "#f7d8b4", "#e4f3fb", "#e2f3fb"],
  cloud: ["#a8cbe3", "#b3d2e7", "#f2cbad", "#fff2e4", "#ffffff", "#ffffff"],
  sunColor: ["#d6eaff", "#e6efff", "#ffbe8a", "#ffd9b0", "#fff3e2", "#fff6e8"],
  sun: [0.7, 0.8, 1.1, 2.0, 2.5, 2.6],
  hemi: [0.5, 0.52, 0.5, 0.6, 0.7, 0.75],
  env: [0.22, 0.24, 0.26, 0.32, 0.42, 0.42],
  glow: [1.5, 1.5, 0.8, 0.25, 0, 0],
  lamps: [0.6, 0.6, 0.3, 0, 0, 0],
  stars: [0.3, 0.2, 0, 0, 0, 0],
  fogNear: [22, 26, 50, 80, 120, 120],
  fogFar: [150, 180, 290, 420, 520, 520],
};
// Sun direction: low and ahead at dawn (backlit clouds), high by midday
const SUN_DAWN = new THREE.Vector3(0, 0.16, -1).normalize();
const SUN_DAY = new THREE.Vector3(-0.45, 0.62, 0.42).normalize();

/** Piecewise value between light keys, eased between each pair. */
function sampleIndex(p: number): [number, number] {
  const n = LIGHT_P.length;
  if (p <= LIGHT_P[0]) return [0, 0];
  for (let i = 0; i < n - 1; i++) {
    if (p <= LIGHT_P[i + 1]) return [i, smoothstep(LIGHT_P[i], LIGHT_P[i + 1], p)];
  }
  return [n - 2, 1];
}

export type JourneyScene = {
  update: (p: number) => void;
  resize: (width: number, height: number) => void;
  render: () => void;
  dispose: () => void;
};

export function createJourneyScene(
  canvas: HTMLCanvasElement,
  { mobile, onAssetLoad }: { mobile: boolean; onAssetLoad?: () => void }
): JourneyScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setClearColor("#5fb2dd");
  const shadows = !mobile;
  if (shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Shadows only matter at the campus: drawn once at load, then kept live
    // only while the student walks there (see update)
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
  }

  const scene = new THREE.Scene();
  const fog = new THREE.Fog("#08111f", 6, 55);
  scene.fog = fog;
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2400);
  let aspect = 1;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envMap = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envMap;
  room.dispose();
  pmrem.dispose();

  /* ---------------- Sky dome + stars (follow the camera) ---------------- */
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { top: { value: new THREE.Color() }, bottom: { value: new THREE.Color() } },
    vertexShader: `varying vec3 vDir;
      void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 bottom; varying vec3 vDir;
      void main() { float h = clamp(vDir.y * 1.4 + 0.06, 0.0, 1.0);
        gl_FragColor = vec4(mix(bottom, top, pow(h, 0.7)), 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1800, 32, 16), skyMat);
  sky.renderOrder = -2;
  scene.add(sky);

  const starGeo = new THREE.BufferGeometry();
  const sr = rng(3);
  const starPos = new Float32Array(900 * 3);
  for (let i = 0; i < 900; i++) {
    const u = sr() * Math.PI * 2;
    const v = 0.08 + sr() * 0.92; // upper hemisphere only
    const r = 1500;
    starPos.set([Math.cos(u) * Math.sqrt(1 - v * v) * r, v * r, Math.sin(u) * Math.sqrt(1 - v * v) * r], i * 3);
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: "#dfeaff", size: mobile ? 1.6 : 1.4, sizeAttenuation: false, transparent: true, fog: false, depthWrite: false });
  const stars = new THREE.Points(starGeo, starMat);
  stars.renderOrder = -1;
  scene.add(stars);

  /* ---------------- Light ---------------- */
  const hemi = new THREE.HemisphereLight("#d9effa", "#bfe0cc", 0.05);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#fff6e8", 0);
  const sunTarget = new THREE.Vector3(0, 0, CAMPUS_Z - 26);
  sun.target.position.copy(sunTarget);
  scene.add(sun, sun.target);
  if (shadows) {
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -46;
    sc.right = 46;
    sc.top = 46;
    sc.bottom = -46;
    sc.near = 10;
    sc.far = 220;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.04;
  }

  // A single key light on the student; the steps light themselves (emissive)
  const spot = new THREE.SpotLight("#ffe2b8", 0, 30, 0.55, 0.85, 1.6);
  spot.position.set(1.5, 9, 6);
  spot.target.position.set(0, 0.8, 1.2);
  scene.add(spot, spot.target);

  /* ---------------- Ground ---------------- */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1800, 2000),
    new THREE.MeshStandardMaterial({ color: CAMPUS_LAWN, roughness: 0.92 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, 0, -700);
  ground.receiveShadow = shadows;
  scene.add(ground);

  /* ---------------- The staircase ---------------- */
  const STEPS = 100;
  const RISE = 0.55;
  const RUN = 1.05;
  const stepGeo = new RoundedBoxGeometry(3.2, 0.24, 1.02, 2, 0.06);
  // Warm self-glow stands in for lights along the stairs (cheap on mobile)
  const stepMat = new THREE.MeshStandardMaterial({ color: "#eef3f8", roughness: 0.35, emissive: "#ffcf94", emissiveIntensity: 0.35 });
  const steps = new THREE.InstancedMesh(stepGeo, stepMat, STEPS);
  const stripMat = new THREE.MeshStandardMaterial({ color: "#2a2116", emissive: "#ffd9a0", emissiveIntensity: 2.4 });
  const strips = new THREE.InstancedMesh(new THREE.BoxGeometry(3.0, 0.05, 0.06), stripMat, STEPS);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < STEPS; i++) {
    const y = RISE * (i + 1) - 0.12;
    const z = -1.0 - RUN * i;
    m4.makeTranslation(0, y, z);
    steps.setMatrixAt(i, m4);
    m4.makeTranslation(0, y + 0.1, z + 0.49);
    strips.setMatrixAt(i, m4);
  }
  scene.add(steps, strips);

  /* ---------------- Campus at the destination ---------------- */
  const campus = new THREE.Group();
  campus.position.set(0, 0, CAMPUS_Z);
  buildCampus(campus, { mobile, shadows, onAssetLoad });
  scene.add(campus);

  /* ---------------- Countryside woodland around the campus ---------------- */
  const wr = rng(29);
  const woods: [number, number, number][] = [];
  const woodCount = mobile ? 140 : 340;
  while (woods.length < woodCount) {
    const x = (wr() * 2 - 1) * 320;
    const z = -150 - wr() * 650;
    const nearCampus = Math.abs(x) < 46 && z < CAMPUS_Z + 8 && z > CAMPUS_Z - 62;
    const nearStairs = Math.abs(x) < 20 && z > -160;
    if (nearCampus || nearStairs) continue;
    // Clumped, like real woodland rather than an even sprinkle
    const clump = 1 + Math.floor(wr() * 4);
    for (let c = 0; c < clump && woods.length < woodCount; c++) {
      woods.push([x + (wr() - 0.5) * 14, z + (wr() - 0.5) * 14, 1.2 + wr() * 1.4]);
    }
  }
  const woodPuffs = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, mobile ? 12 : 18, mobile ? 8 : 12),
    new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.8 }),
    woods.length * 2
  );
  const woodGreens = ["#7fcaa2", "#8fd4ad", "#6fbf95", "#9ad8b6"].map((c) => new THREE.Color(c));
  const wq = new THREE.Quaternion();
  woods.forEach(([x, z, s], i) => {
    m4.compose(new THREE.Vector3(x, 2.2 * s, z), wq, new THREE.Vector3(1.5 * s, 1.5 * s, 1.5 * s));
    woodPuffs.setMatrixAt(i * 2, m4);
    m4.compose(new THREE.Vector3(x + 0.6 * s, 3.2 * s, z - 0.3 * s), wq, new THREE.Vector3(1.05 * s, 1.05 * s, 1.05 * s));
    woodPuffs.setMatrixAt(i * 2 + 1, m4);
    woodPuffs.setColorAt(i * 2, woodGreens[i % 4]);
    woodPuffs.setColorAt(i * 2 + 1, woodGreens[(i + 1) % 4]);
  });
  scene.add(woodPuffs);

  /* ---------------- The student (one figure, start to finish) ---------------- */
  const mat = (color: string, roughness = 0.6) => new THREE.MeshStandardMaterial({ color, roughness });
  const student = new THREE.Group();
  const limb = (r: number, len: number, m: THREE.Material) => {
    const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 14), m);
    mesh.position.y = -len / 2 - r * 0.4;
    mesh.castShadow = shadows;
    const pivot = new THREE.Group();
    pivot.add(mesh);
    return pivot;
  };
  const jeans = mat("#34557f");
  const jacket = mat("#1e3a5f", 0.55);
  const skin = mat("#c98e66", 0.5);
  const legL = limb(0.085, 0.7, jeans);
  const legR = limb(0.085, 0.7, jeans);
  legL.position.set(-0.1, 0.93, 0);
  legR.position.set(0.1, 0.93, 0);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.4, 6, 16), jacket);
  torso.position.y = 1.23;
  torso.scale.set(1.05, 1, 0.75);
  const armL = limb(0.058, 0.5, jacket);
  const armR = limb(0.058, 0.5, jacket);
  armL.position.set(-0.24, 1.46, 0);
  armR.position.set(0.24, 1.46, 0);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.125, 24, 16), skin);
  head.position.y = 1.69;
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.133, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.62), mat("#21160f", 0.7));
  hair.position.set(0, 1.705, 0.012);
  const pack = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.44, 0.17, 2, 0.06), mat("#12a4e0", 0.45));
  pack.position.set(0, 1.25, 0.2); // on the back (the student faces -z)
  // Studwise badge: the logo on a white patch on the backpack
  // Studwise wings emblem (white, transparent wings) on the blue pack.
  // Self-lit so the warm sun and tone mapping never tint it cream
  const logoTex = new THREE.TextureLoader().load("/images/studwise-wings-logo.png", () => onAssetLoad?.());
  logoTex.colorSpace = THREE.SRGBColorSpace;
  logoTex.anisotropy = 8;
  // Crop to the emblem (the 146 × 146 artwork has a ~6px empty margin)
  logoTex.repeat.set(134 / 146, 134 / 146);
  logoTex.offset.set(6 / 146, 6 / 146);
  const logo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.22, 0.22),
    new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 })
  );
  logo.position.set(0, 1.28, 0.287);
  [torso, head, hair, pack].forEach((m) => (m.castShadow = shadows));
  student.add(legL, legR, torso, armL, armR, head, hair, pack, logo);
  scene.add(student);

  const pose = (phase: number, amount: number) => {
    const s = Math.sin(phase) * amount;
    legL.rotation.x = s * 0.5;
    legR.rotation.x = -s * 0.5;
    armL.rotation.x = -s * 0.42;
    armR.rotation.x = s * 0.42;
  };

  /* ---------------- Clouds (the site's cloud artwork, as billboards) ---------------- */
  const loader = new THREE.TextureLoader();
  const cloudTex = loader.load("/images/cloud.png", () => onAssetLoad?.());
  cloudTex.colorSpace = THREE.SRGBColorSpace;
  const cloudMats = [0.45, 0.7, 0.92].map(
    (opacity) => new THREE.SpriteMaterial({ map: cloudTex, transparent: true, opacity, depthWrite: false, fog: true })
  );
  const cr = rng(17);
  const CLOUD_RATIO = 503 / 940;
  const addClouds = (n: number, x: [number, number], y: [number, number], z: [number, number], size: [number, number], keepCentreClear = 0) => {
    for (let i = 0; i < n; i++) {
      let px = lerp(x[0], x[1], cr());
      if (keepCentreClear && Math.abs(px) < keepCentreClear) px = Math.sign(px || 1) * (keepCentreClear + cr() * 20);
      const s = lerp(size[0], size[1], cr());
      const sprite = new THREE.Sprite(cloudMats[Math.floor(cr() * cloudMats.length)]);
      sprite.position.set(px, lerp(y[0], y[1], cr()), lerp(z[0], z[1], cr()));
      sprite.scale.set(s, s * CLOUD_RATIO, 1);
      scene.add(sprite);
    }
  };
  const k = mobile ? 0.5 : 1;
  addClouds(Math.round(16 * k), [-28, 28], [44, 62], [-86, -132], [16, 32]); // bank around the stair top
  addClouds(Math.round(48 * k), [-150, 150], [46, 66], [-130, -330], [28, 54]); // sea of clouds
  addClouds(Math.round(10 * k), [-200, 200], [95, 130], [-160, -520], [36, 70]); // high wisps
  addClouds(Math.round(12 * k), [-160, 160], [52, 72], [-340, -540], [30, 56], 34); // thinning over the campus

  /* ---------------- Paths keyed to progress ---------------- */
  const v = (a: V3) => new THREE.Vector3(...a);
  const camPath = new THREE.CatmullRomCurve3(CAMERA.map((c) => v(c[1])), false, "centripetal");
  const lookPath = new THREE.CatmullRomCurve3(CAMERA.map((c) => v(c[2])), false, "centripetal");
  const camKeys = CAMERA.map((c) => c[0]);

  /** Curve parameter for progress p, given the progress at each key */
  const curveT = (keys: number[], p: number) => {
    const n = keys.length;
    if (p <= keys[0]) return 0;
    if (p >= keys[n - 1]) return 1;
    let i = 0;
    while (p > keys[i + 1]) i++;
    return (i + (p - keys[i]) / (keys[i + 1] - keys[i])) / (n - 1);
  };

  const cols = Object.fromEntries(
    (["skyTop", "horizon", "cloud", "sunColor"] as const).map((key) => [key, LIGHT[key].map((c) => new THREE.Color(c))])
  ) as Record<"skyTop" | "horizon" | "cloud" | "sunColor", THREE.Color[]>;
  const col = new THREE.Color();
  const sampleColor = (key: keyof typeof cols, p: number, out: THREE.Color) => {
    const [i, u] = sampleIndex(p);
    return out.copy(cols[key][i]).lerp(cols[key][i + 1], u);
  };
  const sampleNum = (key: Exclude<keyof typeof LIGHT, keyof typeof cols>, p: number) => {
    const [i, u] = sampleIndex(p);
    const arr = LIGHT[key];
    return lerp(arr[i], arr[i + 1], u);
  };

  const pos = new THREE.Vector3();
  const look = new THREE.Vector3();
  const sunDir = new THREE.Vector3();
  let lastP = 0;

  const update = (p: number) => {
    lastP = p = clamp(p);

    /* Camera */
    const ct = curveT(camKeys, p);
    camPath.getPoint(ct, pos);
    lookPath.getPoint(ct, look);
    camera.position.copy(pos);
    camera.lookAt(look);
    const portrait = aspect < 0.85 ? 1.22 : 1;
    camera.fov = lerp(50, 56, smoothstep(0.75, 1, p)) * portrait;
    camera.updateProjectionMatrix();
    sky.position.copy(pos);
    stars.position.copy(pos);

    /* Light, sky, fog */
    skyMat.uniforms.top.value.copy(sampleColor("skyTop", p, col));
    skyMat.uniforms.bottom.value.copy(sampleColor("horizon", p, col));
    fog.color.copy(skyMat.uniforms.bottom.value);
    renderer.setClearColor(fog.color);
    fog.near = sampleNum("fogNear", p);
    fog.far = sampleNum("fogFar", p);
    sun.intensity = sampleNum("sun", p);
    sampleColor("sunColor", p, sun.color);
    sunDir.copy(SUN_DAWN).lerp(SUN_DAY, smoothstep(0.45, 0.9, p)).normalize();
    sun.position.copy(sunTarget).addScaledVector(sunDir, 140);
    hemi.intensity = sampleNum("hemi", p);
    scene.environmentIntensity = sampleNum("env", p);
    stripMat.emissiveIntensity = sampleNum("glow", p);
    const lamps = sampleNum("lamps", p);
    spot.intensity = 70 * lamps;
    stepMat.emissiveIntensity = 0.35 * lamps;
    if (shadows && p > 0.82) renderer.shadowMap.needsUpdate = true;
    starMat.opacity = sampleNum("stars", p);
    stars.visible = starMat.opacity > 0.01;
    sampleColor("cloud", p, col);
    cloudMats.forEach((m) => m.color.copy(col));

    /* Student — at the foot of the stairs, then walking up the avenue */
    if (p < 0.5) {
      student.position.set(0, 0, 1.2);
      pose(0, 0);
    } else {
      const walk = smoothstep(0.86, 1, p);
      const dist = walk * 9;
      student.position.set(0.15, 0, CAMPUS_Z - 3.2 - dist);
      const stride = smoothstep(0.86, 0.88, p) * (1 - smoothstep(0.985, 1, p));
      pose((dist / 0.7) * Math.PI, stride);
      student.position.y = Math.abs(Math.sin((dist / 0.7) * Math.PI)) * 0.03 * stride;
    }
  };

  const render = () => renderer.render(scene, camera);

  const resize = (width: number, height: number) => {
    renderer.setSize(width, height, false);
    aspect = clamp(width / Math.max(1, height), 0.3, 4);
    camera.aspect = aspect;
    update(lastP);
  };

  const dispose = () => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mats = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
      mats.forEach((m) => {
        const map = (m as THREE.MeshStandardMaterial).map;
        if (map) map.dispose();
        m.dispose();
      });
    });
    envMap.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { update, resize, render, dispose };
}
