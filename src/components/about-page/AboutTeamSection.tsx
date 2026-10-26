import Image from "next/image";
import Link from "next/link";
import CloudButton from "@/components/ui/CloudButton";
import { Eyebrow, gutter } from "@/components/shared/PageKit";
import ScrollWords from "@/components/shared/ScrollWords";
import { teamGroups, teamSize } from "@/data/team";

const members = teamGroups.flatMap((g) => g.members.map((m) => ({ ...m, group: g.id })));
const FACES = 5;
const ARROW = "M5 12h14m-6-6 6 6-6 6";

function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ARROW} />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   AboutTeamSection — "Meet our team" on the About page: a pastel panel
   that invites a click through to /team from every part of it. The faces
   of the team lead to the team page, each group chip jumps to its group
   there, and every card in the slow marquee links to its member's group
   (the marquee pauses under the pointer and a "View" chip appears on the
   card; hover only tints, it never lifts).
   -------------------------------------------------------------------------- */
export default function AboutTeamSection() {
  return (
    <section id="our-team" aria-labelledby="about-team-heading" className="scroll-mt-6 bg-[#F1F5F9]">
      <div className={`${gutter} pb-14 sm:pb-20 lg:pb-28`}>
        <div className="relative isolate overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#dff2fb] via-[#ecf7fd] to-white ring-1 ring-[#009cd9]/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <span className="pointer-events-none absolute -top-32 -left-24 -z-10 w-[28rem] h-[28rem] rounded-full bg-white/70 blur-3xl" aria-hidden="true" />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div data-reveal className="lg:col-span-5 2xl:col-span-4">
              <Eyebrow>Meet our team</Eyebrow>
              <h2 id="about-team-heading" className="section-title mt-5 text-slate-900">
                The people behind <span className="text-[#0a7fb3]">every application</span>
              </h2>
              <ScrollWords
                text={`Our ${teamSize}-strong team of branch heads, application specialists, counsellors and coordinators works with students from their first counselling session to their visa.`}
                className="mt-5 max-w-md body-text text-slate-600"
              />

              {/* The faces of the team */}
              <Link href="/team" className="group/faces mt-7 inline-flex items-center gap-3.5">
                <span className="flex -space-x-2.5 sm:-space-x-3" aria-hidden="true">
                  {members.slice(0, FACES).map((m) => (
                    <Image
                      key={m.name}
                      src={m.photo}
                      alt=""
                      width={88}
                      height={88}
                      sizes="44px"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover object-top bg-sky-100 ring-[3px] ring-[#ecf7fd]"
                    />
                  ))}
                </span>
                <span className="text-[13px] sm:text-sm leading-snug whitespace-nowrap text-slate-600">
                  <span className="block text-slate-900 transition-colors group-hover/faces:text-[#0a7fb3]">One team, behind every student</span>
                  Say hello to them all
                </span>
              </Link>


              {/* The section's main action: a large button with its own line of context */}
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                <CloudButton href="/team" size="lg" className="mt-0 shadow-[0_18px_36px_-16px_rgba(0,140,200,0.75)]">
                  Meet Our Team
                </CloudButton>
                <span className="text-sm text-slate-600">Every counsellor, coordinator and branch head</span>
              </div>
            </div>

            <div
              data-reveal
              className="team-marquee lg:col-span-7 2xl:col-span-8 min-w-0 -mr-5 sm:-mr-8 lg:-mr-12 overflow-hidden motion-reduce:overflow-x-auto"
            >
              <ul className="team-marquee__track flex w-max gap-3 sm:gap-4 py-1" aria-label="Studwise team members">
                {[...members, ...members].map((m, i) => {
                  const copy = i >= members.length;
                  return (
                    <li
                      key={`${m.name}-${i}`}
                      aria-hidden={copy || undefined}
                      className={`w-44 sm:w-52 lg:w-56 shrink-0 ${copy ? "motion-reduce:hidden" : ""}`}
                    >
                      <Link
                        href={`/team#${m.group}`}
                        tabIndex={copy ? -1 : undefined}
                        className="group block h-full rounded-2xl bg-white p-2 ring-1 ring-slate-900/5 transition-[box-shadow] duration-300 hover:ring-[#009cd9]/35"
                      >
                        <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-slate-100">
                          <Image
                            src={m.photo}
                            alt={copy ? "" : `${m.name}, ${m.role} at Studwise`}
                            fill
                            sizes="(min-width: 1024px) 224px, (min-width: 640px) 208px, 176px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                          <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 h-7 pl-2.5 pr-2 rounded-full bg-white/90 backdrop-blur text-[12px] text-[#0a7fb3] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            View
                            <Arrow className="w-3.5 h-3.5" />
                          </span>
                        </span>
                        <span className="block px-2 pt-4 pb-2">
                          <span className="block text-base sm:text-lg leading-snug tracking-tight text-slate-900 break-words transition-colors group-hover:text-[#0a7fb3]">
                            {m.name}
                          </span>
                          <span className="block mt-0.5 text-sm sm:text-[15px] leading-snug text-slate-500">{m.role}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
