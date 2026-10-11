import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ==========================================================================
   Campus — the destination of the staircase journey (Three.js)
   ==========================================================================
   Builds the university campus into a group with its entrance at the
   group origin, facing +z: an avenue running back past a fountain to a
   domed main hall (z ≈ -38), flanked by wings, a library, a studio, a
   clock tower and a second hall, with trees, hedges, lamps, flags of
   study destinations and students. Soft, rounded "3D icon" styling in
   the site's white and brand blue.

   Units are metres. The caller supplies the renderer, lights and ground.
   ========================================================================== */

// Palette taken from the site: white and brand blue, glossy like the hero
// airplane, with soft mint greens and pale sky — no hard outlines
const C = {
  white: "#f4f7fa",
  shade: "#dfe8ef",
  path: "#ffffff",
  lawn: "#b9e2c7",
  lawnFar: "#d6ecdf",
  hedge: "#86cca4",
  blue: "#12a4e0",
  blueDeep: "#0a7fb3",
  glass: "#a9dcf2",
  gold: "#f5b942",
  water: "#7fd3f3",
  trunk: "#d9c6b2",
};

const FLAGS = ["gb", "us", "ca", "de", "ie", "fr"];

/** Lawn colour, shared with the journey's ground so they meet seamlessly */
export const CAMPUS_LAWN = C.lawn;

export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type CampusOptions = {
  mobile: boolean;
  shadows: boolean;
  onAssetLoad?: () => void;
};

/** Adds the campus to `group` (entrance at the group origin, facing +z). */
export function buildCampus(group: THREE.Group, { mobile, shadows, onAssetLoad }: CampusOptions) {
  /* ---------------- Materials ---------------- */
  const clay = (color: string, roughness = 0.6, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra });
  const gloss = (color: string, extra: THREE.MeshPhysicalMaterialParameters = {}) =>
    new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12, ...extra });

  const white = clay(C.white, 0.55);
  const shade = clay(C.shade, 0.6);
  const blueRoof = gloss(C.blue);
  const glass = gloss(C.glass, { roughness: 0.12 });

  /* ---------------- Geometry helpers (everything has soft edges) ---------------- */
  const roundedCache = new Map<string, THREE.BufferGeometry>();
  const rounded = (w: number, h: number, d: number, r: number) => {
    const radius = Math.min(r, Math.min(w, h, d) / 2 - 0.001);
    const key = `${w}|${h}|${d}|${radius}`;
    let geo = roundedCache.get(key);
    if (!geo) {
      geo = new RoundedBoxGeometry(w, h, d, 3, radius);
      roundedCache.set(key, geo);
    }
    return geo;
  };

  const box = (
    mat: THREE.Material,
    [w, h, d]: [number, number, number],
    [x, y, z]: [number, number, number],
    r = 0.22,
    cast = true
  ) => {
    const m = new THREE.Mesh(rounded(w, h, d, r), mat);
    m.position.set(x, y, z);
    m.castShadow = cast && shadows;
    m.receiveShadow = shadows;
    group.add(m);
    return m;
  };

  /** Bevelled triangular prism: triangle in XY (width × height), extruded along Z */
  const prism = (mat: THREE.Material, w: number, h: number, len: number, [x, y, z]: [number, number, number]) => {
    const b = 0.14;
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + b, b * 0.6);
    shape.lineTo(w / 2 - b, b * 0.6);
    shape.lineTo(0, h - b);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: len - b * 2,
      bevelEnabled: true,
      bevelThickness: b,
      bevelSize: b,
      bevelSegments: 4,
    });
    geo.translate(0, 0, -(len - b * 2) / 2);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = shadows;
    m.receiveShadow = shadows;
    group.add(m);
    return m;
  };

  const cyl = (mat: THREE.Material, r: number, h: number, [x, y, z]: [number, number, number], seg = 40) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
    m.position.set(x, y, z);
    m.castShadow = shadows;
    m.receiveShadow = shadows;
    group.add(m);
    return m;
  };

  const pathMat = clay(C.path, 0.75);
  box(pathMat, [3.2, 0.08, 34], [0, 0.0, -17], 0.04, false); // main avenue
  box(pathMat, [30, 0.08, 2.8], [0, 0.001, -18], 0.04, false); // cross walk
  box(pathMat, [20, 0.08, 6], [0, 0.002, -31], 0.04, false); // forecourt

  // Low rounded hedges line the avenue
  const hedge = clay(C.hedge, 0.7);
  for (const x of [-3.05, 3.05]) {
    box(hedge, [0.55, 0.6, 12.5], [x, 0.3, -9.6], 0.27);
    box(hedge, [0.55, 0.6, 8.4], [x, 0.3, -25.2], 0.27);
  }

  /* ---------------- Fountain ---------------- */
  cyl(white, 2.4, 0.55, [0, 0.27, -18]);
  cyl(gloss(C.water, { roughness: 0.05 }), 2.08, 0.06, [0, 0.56, -18]);
  cyl(white, 0.3, 1.7, [0, 1.2, -18]);
  const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.7, 40, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), white);
  bowl.position.set(0, 2.1, -18);
  bowl.castShadow = shadows;
  group.add(bowl);

  /* ---------------- Windows (one instanced mesh, rounded) ---------------- */
  const windows: THREE.Matrix4[] = [];
  const faceX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
  const win = (x: number, y: number, z: number, axis: "x" | "z", w = 0.95, h = 1.4) => {
    const m = new THREE.Matrix4();
    m.compose(
      new THREE.Vector3(x, y, z),
      axis === "x" ? faceX : new THREE.Quaternion(),
      new THREE.Vector3(w, h, 1)
    );
    windows.push(m);
  };

  /* ---------------- Main hall: portico, pediment, dome ---------------- */
  box(white, [24, 9, 8], [0, 4.5, -38], 0.35);
  box(shade, [24.8, 0.7, 8.8], [0, 9.2, -38], 0.3); // cornice
  box(shade, [19, 0.42, 5.4], [0, 0.21, -31.6], 0.18); // steps
  box(white, [18, 0.42, 4.6], [0, 0.62, -31.9], 0.18);
  for (let i = 0; i < 8; i++) {
    const x = -7.5 + (15 / 7) * i;
    cyl(white, 0.42, 6.2, [x, 4.0, -30.6]);
    cyl(shade, 0.58, 0.32, [x, 1.0, -30.6]); // base
    cyl(shade, 0.58, 0.32, [x, 7.2, -30.6]); // capital
  }
  box(white, [18.2, 1.1, 3.4], [0, 7.95, -31.8], 0.3);
  prism(shade, 18.8, 2.6, 3.6, [0, 8.5, -31.8]);
  cyl(white, 3.5, 2.4, [0, 10.6, -38], 64);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(3.55, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2), blueRoof);
  dome.position.set(0, 11.8, -38);
  dome.castShadow = shadows;
  group.add(dome);
  cyl(white, 0.6, 1.4, [0, 15.7, -38]);
  const spire = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 16), gloss(C.gold));
  spire.position.set(0, 17.0, -38);
  group.add(spire);
  for (const x of [-11, -9.3, 9.3, 11]) for (const y of [2.6, 6.2]) win(x, y, -33.95, "z");
  for (const x of [-5.4, -1.8, 1.8, 5.4]) for (const y of [2.6, 6.2]) win(x, y, -33.95, "z", 1.1, 1.8);

  /* ---------------- West wing (classic, glossy blue roof) ---------------- */
  box(white, [8, 7, 20], [-15, 3.5, -20], 0.35);
  prism(blueRoof, 8.9, 2.8, 20.9, [-15, 7, -20]);
  for (let z = -28.5; z <= -11.5; z += 2.4) for (const y of [1.9, 4.6]) win(-10.95, y, z, "x");
  box(gloss(C.blueDeep), [0.24, 2.6, 1.8], [-10.95, 1.3, -20], 0.1, false); // door

  /* ---------------- East wing (modern glass) ---------------- */
  box(white, [8, 8.4, 18], [15, 4.2, -21], 0.45);
  for (const y of [1.7, 4.2, 6.7]) box(glass, [0.24, 1.6, 16.2], [10.95, y, -21], 0.1, false);
  box(shade, [8.6, 0.42, 18.6], [15, 8.55, -21], 0.2);

  /* ---------------- Library & studio by the entrance ---------------- */
  box(white, [6, 5, 6], [-9.5, 2.5, -7.5], 0.3);
  prism(blueRoof, 6.7, 2.3, 6.7, [-9.5, 5, -7.5]);
  for (const x of [-11, -8]) for (const y of [1.6, 3.6]) win(x, y, -4.45, "z", 0.9, 1.2);
  box(white, [6, 6, 6], [9.5, 3, -7.5], 0.45);
  box(glass, [4.8, 4.6, 0.24], [9.5, 3.1, -4.45], 0.1, false);

  /* ---------------- Clock tower & a second hall ---------------- */
  box(white, [3.6, 16, 3.6], [-21, 8, -44], 0.3);
  const clock = cyl(clay("#ffffff", 0.4), 1.15, 0.16, [-21, 13.2, -42.1], 48);
  clock.rotation.x = Math.PI / 2;
  const clockRing = cyl(blueRoof, 1.32, 0.1, [-21, 13.2, -42.18], 48);
  clockRing.rotation.x = Math.PI / 2;
  const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(2.7, 3.8, 48), blueRoof);
  towerRoof.position.set(-21, 17.9, -44);
  towerRoof.castShadow = shadows;
  group.add(towerRoof);

  box(clay("#e6f2f9", 0.55), [11, 8, 8], [20, 4, -46], 0.4);
  prism(blueRoof, 11.7, 3, 8.7, [20, 8, -46]);
  for (const x of [16, 18.6, 21.4, 24]) for (const y of [2.2, 5.4]) win(x, y, -41.95, "z");

  // Distant buildings and hills, softened by fog
  const far = rng(7);
  for (let i = 0; i < 9; i++) {
    const w = 6 + far() * 8;
    const h = 5 + far() * 9;
    box(clay(i % 3 ? C.white : "#e3f0f7", 0.6), [w, h, 6 + far() * 6], [-48 + i * 12 + far() * 4, h / 2, -66 - far() * 22], 0.6);
  }
  const hillMat = clay(C.lawnFar, 0.95);
  for (const [x, z, r] of [[-90, -190, 60], [10, -230, 80], [110, -200, 70]]) {
    const hill = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 24), hillMat);
    hill.scale.y = 0.28;
    hill.position.set(x, 0, z);
    group.add(hill);
  }

  const winMesh = new THREE.InstancedMesh(new RoundedBoxGeometry(1, 1, 0.22, 2, 0.08), glass, windows.length);
  windows.forEach((m, i) => winMesh.setMatrixAt(i, m));
  group.add(winMesh);

  /* ---------------- Trees: soft clusters of spheres ---------------- */
  const treeSpots: [number, number, number][] = [];
  for (const z of [-4, -8, -12, -24, -28]) for (const x of [-4.4, 4.4]) treeSpots.push([x, z, 1]);
  const tr = rng(21);
  const clear = (x: number, z: number) =>
    Math.abs(x) < 3.5 || // avenue + hedges
    (Math.abs(z + 18) < 2.6 && Math.abs(x) < 16) || // cross walk
    (x < -5.5 && x > -13 && z > -11 && z < -3.5) || // library
    (x > 5.5 && x < 13 && z > -11 && z < -3.5) || // studio
    (Math.abs(x) > 10.4 && Math.abs(x) < 19.6 && z < -9 && z > -31) || // wings
    (Math.abs(x) < 13 && z < -28); // main hall
  while (treeSpots.length < (mobile ? 40 : 64)) {
    const x = (tr() * 2 - 1) * 40;
    const z = -3 - tr() * 52;
    if (clear(x, z)) continue;
    treeSpots.push([x, z, 0.8 + tr() * 0.6]);
  }
  // Three overlapping puffs per tree, like the site's clouds
  const puffs: [number, number, number, number][] = [
    [0, 2.5, 0, 1.25],
    [0.75, 2.05, 0.25, 0.9],
    [-0.6, 2.15, -0.3, 0.85],
    [0.15, 3.25, -0.1, 0.8],
  ];
  const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.14, 0.2, 1.8, 16), clay(C.trunk, 0.7), treeSpots.length);
  const crowns = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 28, 20), clay("#ffffff", 0.65), treeSpots.length * puffs.length);
  const greens = ["#8fd4ad", "#7fcaa2", "#a6debf", "#74c39b"].map((c) => new THREE.Color(c));
  const tmp = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  treeSpots.forEach(([x, z, s], i) => {
    tmp.compose(new THREE.Vector3(x, 0.9 * s, z), q, new THREE.Vector3(s, s, s));
    trunks.setMatrixAt(i, tmp);
    const turn = tr() * Math.PI * 2;
    const tone = greens[i % greens.length];
    puffs.forEach(([px, py, pz, pr], k) => {
      const c = Math.cos(turn);
      const sn = Math.sin(turn);
      tmp.compose(
        new THREE.Vector3(x + (px * c - pz * sn) * s, py * s, z + (px * sn + pz * c) * s),
        q,
        new THREE.Vector3(pr * s, pr * s, pr * s)
      );
      crowns.setMatrixAt(i * puffs.length + k, tmp);
      crowns.setColorAt(i * puffs.length + k, tone.clone().offsetHSL(0, 0, k === 3 ? 0.05 : 0));
    });
  });
  trunks.castShadow = crowns.castShadow = shadows;
  crowns.receiveShadow = shadows;
  group.add(trunks, crowns);

  /* ---------------- Lamps along the avenue ---------------- */
  const lampZ = [-2.5, -12.5, -23, -28.5];
  const posts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.07, 0.09, 3.2, 16), clay("#ffffff", 0.45), lampZ.length * 2);
  const bulbs = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.24, 24, 16),
    clay("#ffffff", 0.2, { emissive: "#fff1c9", emissiveIntensity: 1.2 }),
    lampZ.length * 2
  );
  lampZ.forEach((z, i) =>
    [-2.3, 2.3].forEach((x, j) => {
      tmp.makeTranslation(x, 1.6, z);
      posts.setMatrixAt(i * 2 + j, tmp);
      tmp.makeTranslation(x, 3.32, z);
      bulbs.setMatrixAt(i * 2 + j, tmp);
    })
  );
  posts.castShadow = shadows;
  group.add(posts, bulbs);

  /* ---------------- Flags of study destinations ---------------- */
  const flagGeo = new THREE.PlaneGeometry(1.6, 1, 16, 1);
  const pos = flagGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    pos.setZ(i, Math.sin((x + 0.8) * 3.2) * 0.08 * (x + 0.8)); // a gentle ripple
  }
  flagGeo.computeVertexNormals();
  flagGeo.translate(0.8, 0, 0);
  const loader = new THREE.TextureLoader();
  const flagSpots: [number, number][] = [[-6.2, -11], [-6.2, -14.5], [-6.2, -22], [6.2, -11], [6.2, -14.5], [6.2, -22]];
  const poleMat = clay("#ffffff", 0.4);
  flagSpots.forEach(([x, z], i) => {
    cyl(poleMat, 0.05, 5.4, [x, 2.7, z], 16);
    const mat = clay("#ffffff", 0.7, { side: THREE.DoubleSide });
    loader.load(`/flags/${FLAGS[i]}.svg`, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      mat.map = tex;
      mat.needsUpdate = true;
      onAssetLoad?.();
    });
    const flag = new THREE.Mesh(flagGeo, mat);
    flag.position.set(x, 4.7, z);
    flag.rotation.y = x < 0 ? -0.35 : 0.35 + Math.PI; // angled toward the avenue
    flag.castShadow = shadows;
    group.add(flag);
  });

  /* ---------------- Students (soft, rounded figures in brand colours) ---------------- */
  const sr = rng(5);
  const people: [number, number][] = [];
  while (people.length < (mobile ? 12 : 18)) {
    const onAvenue = sr() < 0.6;
    const x = onAvenue ? (sr() * 2 - 1) * 1.2 : (sr() * 2 - 1) * 8;
    // Beyond the fountain, clear of the arriving student and the final close-up
    const z = onAvenue ? -21 - sr() * 8 : -30 - sr() * 2.5;
    if (Math.abs(z + 18) < 2.6 && Math.abs(x) < 2.6) continue; // fountain
    people.push([x, z]);
  }
  const bodies = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.21, 0.7, 8, 20), clay("#ffffff", 0.5), people.length);
  const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.17, 24, 16), clay("#ffffff", 0.55), people.length);
  const coats = ["#12a4e0", "#ffffff", "#0a7fb3", "#f5b942", "#8fd4ad", "#1e3a5f"].map((c) => new THREE.Color(c));
  const skins = ["#f1c7a5", "#d9a17a", "#a8714e", "#7a4e33"].map((c) => new THREE.Color(c));
  people.forEach(([x, z], i) => {
    tmp.makeTranslation(x, 0.56, z);
    bodies.setMatrixAt(i, tmp);
    bodies.setColorAt(i, coats[i % coats.length]);
    tmp.makeTranslation(x, 1.32, z);
    heads.setMatrixAt(i, tmp);
    heads.setColorAt(i, skins[(i * 3) % skins.length]);
  });
  bodies.castShadow = shadows;
  group.add(bodies, heads);

}
