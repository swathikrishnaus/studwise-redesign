import Image from "next/image";
import CloudButton from "@/components/ui/CloudButton";
import { teamGroups } from "@/data/team";

const faces = teamGroups.flatMap((g) => g.members).slice(0, 5);

export default function MeetTeamCta() {
  return (
    <section
      aria-labelledby="meet-team-heading"
      className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl bg-white ring-1 ring-slate-900/5 px-6 py-8 sm:px-10 sm:py-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
        <div className="flex -space-x-3 shrink-0" aria-hidden="true">
          {faces.map((m) => (
            <span key={m.name} className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white bg-slate-100">
              <Image src={m.photo} alt="" fill sizes="48px" className="object-cover object-top" />
            </span>
          ))}
        </div>
        <div>
          <h2 id="meet-team-heading" className="text-2xl sm:text-[1.75rem] tracking-[-0.03em] leading-tight text-slate-900">
            Meet the People Behind Studwise
          </h2>
          <p className="mt-1.5 text-[15px] text-slate-600">Get to know the team supporting students throughout their journey.</p>
        </div>
      </div>
      <CloudButton href="/team" className="self-start md:self-auto shrink-0">
        Meet Our Team
      </CloudButton>
    </section>
  );
}
