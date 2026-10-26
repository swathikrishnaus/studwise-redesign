import Link from "next/link";
import { Icon } from "@/components/shared/PageKit";
import { formatPostDate } from "@/data/blog";
import type { Post } from "@/data/blog";
import PostCover from "./PostCover";

const ARROW = "M5 12h14m-6-6 6 6-6 6";

/* "Keep reading": three more articles, same topic first */
export default function RelatedPosts({ posts }: { posts: Post[] }) {
  return (
    <section aria-labelledby="related-heading">
      <div className="flex items-end justify-between gap-6">
        <h2 id="related-heading" className="section-title text-slate-900">
          Keep reading
        </h2>
        <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm text-slate-700 hover:text-[#0a7fb3]">
          All articles
          <Icon d={ARROW} className="w-4 h-4" />
        </Link>
      </div>
      <ul className="mt-8 sm:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {posts.map((p) => (
          <li key={p.slug} className="group relative">
            <div className="overflow-hidden rounded-2xl">
              <PostCover {...p} className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              <span className="text-[#0a7fb3]">{p.topic}</span> · {formatPostDate(p.date)}
            </p>
            <h3 className="mt-2 text-xl leading-snug tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-[#0a7fb3]">
              <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                {p.title}
              </Link>
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
