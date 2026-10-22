import CloudButton from "@/components/ui/CloudButton";
import { Eyebrow, gutter } from "@/components/shared/PageKit";
import ScrollWords from "@/components/shared/ScrollWords";
import TeamMemberCard from "@/components/team-page/TeamMemberCard";
import { teamGroups, teamSize } from "@/data/team";

const members = teamGroups.flatMap((g) => g.members);

export default function AboutTeamSection() {
  return (
    <section id="our-team" aria-labelledby="about-team-heading" className="scroll-mt-6 bg-[#F1F5F9]">
      <div className={`${gutter} pb-14 sm:pb-20 lg:pb-28`}>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end px-3 sm:px-5 lg:px-6">
          <div data-reveal className="lg:col-span-4">
            <Eyebrow>Meet our team</Eyebrow>
            <h2
              id="about-team-heading"
              className="mt-5 font-normal tracking-[-0.04em] leading-[1.02] text-slate-900 text-[clamp(2rem,7vw,2.8rem)] sm:text-[clamp(2.4rem,4.4vw,3.4rem)] text-balance"
            >
              The people behind <span className="text-[#0a7fb3]">every application</span>
            </h2>
            <ScrollWords
              text={`Our ${teamSize}-strong team of branch heads, application specialists, counsellors and coordinators works with students from their first counselling session to their visa.`}
              className="mt-5 max-w-md text-[15px] sm:text-base leading-relaxed text-slate-600"
            />
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Our teams">
              {teamGroups.map((g) => (
                <li key={g.id} className="rounded-full bg-white px-3 py-1.5 text-[13px] text-slate-600 ring-1 ring-slate-200">
                  {g.title}
                  <span className="ml-1.5 tabular-nums text-slate-400">{g.members.length}</span>
                </li>
              ))}
            </ul>
            <CloudButton href="/team" className="mt-8">
              Meet Our Team
            </CloudButton>
          </div>

          <div
            data-reveal
            className="team-marquee lg:col-span-8 min-w-0 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          >
            <ul className="team-marquee__track flex w-max gap-3 sm:gap-4 py-1" aria-label="Studwise team members">
              {[...members, ...members].map((m, i) => (
                <li
                  key={`${m.name}-${i}`}
                  aria-hidden={i >= members.length || undefined}
                  className={`w-44 sm:w-52 lg:w-56 shrink-0 ${i >= members.length ? "motion-reduce:hidden" : ""}`}
                >
                  <TeamMemberCard member={m} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
