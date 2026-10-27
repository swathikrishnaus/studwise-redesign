import Image from "next/image";
import type { TeamMember } from "@/data/team";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group h-full rounded-2xl bg-white p-2 ring-1 ring-slate-900/5 transition-[box-shadow] duration-300 hover:ring-[#009cd9]/30">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role} at Studwise`}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="px-2 pt-4 pb-2">
        <h3 className="text-base sm:text-lg leading-snug tracking-tight text-slate-900 break-words">{member.name}</h3>
        <p className="mt-0.5 text-sm sm:text-[15px] leading-snug text-slate-500">{member.role}</p>
      </div>
    </article>
  );
}
