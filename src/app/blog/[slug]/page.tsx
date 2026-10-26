import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroHeader from "@/components/hero/HeroHeader";
import CloudButton from "@/components/ui/CloudButton";
import { gutter } from "@/components/shared/PageKit";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleToc from "@/components/blog/ArticleToc";
import BlogCta from "@/components/blog/BlogCta";
import PostCover from "@/components/blog/PostCover";
import ReadingProgress from "@/components/blog/ReadingProgress";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ShareButtons from "@/components/blog/ShareButtons";
import { formatPostDate, getPost, posts, relatedPosts } from "@/data/blog";
import { bookAppointmentHref } from "@/data/whyChooseUs";
import { SITE_URL } from "@/lib/constants";

// Only the imported articles exist; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt.slice(0, 160), publishedTime: post.date },
  };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  // Guides are about Kerala or studying abroad in general, not a destination
  const destination = post.topic === "Guides" ? "abroad" : `in ${post.kicker === "UK" ? "the UK" : post.kicker}`;

  return (
    <div className="bg-[#F1F5F9]">
      <ReadingProgress target="article-body" />
      <HeroHeader />

      <article className={`${gutter} pb-16 sm:pb-20 lg:pb-24`}>
        {/* Header */}
        <header className="rounded-3xl bg-white ring-1 ring-slate-900/5 p-3 sm:p-4">
          <div className="px-3 pt-8 pb-8 sm:px-6 sm:pt-12 lg:px-10 lg:pt-14 lg:pb-12">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <li>
                  <Link href="/blog" className="hover:text-[#0a7fb3]">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#0a7fb3]">{post.topic}</li>
              </ol>
            </nav>
            <h1 className="mt-6 max-w-5xl font-normal tracking-[-0.045em] leading-[1.02] text-slate-900 text-[clamp(2.3rem,9vw,3.2rem)] sm:text-[clamp(3rem,6.4vw,4.8rem)] text-balance">
              {post.title}
            </h1>
            {post.dek && <p className="mt-5 max-w-3xl body-lead text-slate-600">{post.dek}</p>}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-sky-50 text-[#0a7fb3] ring-1 ring-sky-100 text-sm">SW</span>
                <p className="text-sm leading-tight">
                  <span className="block text-slate-900">Studwise counselling team</span>
                  <span className="text-slate-500">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.minutes} min read
                  </span>
                </p>
              </div>
              <ShareButtons title={post.title} url={url} />
            </div>
          </div>
          <PostCover {...post} large scale={0.6} className="aspect-[16/9] sm:aspect-[3/1] rounded-2xl" />
        </header>

        {/* Body */}
        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-8">
              <ArticleToc headings={post.headings} variant="rail" />
            </div>
          </aside>

          <div className="lg:col-span-6 min-w-0">
            <div className="lg:hidden mb-8">
              <ArticleToc headings={post.headings} variant="inline" />
            </div>
            <div id="article-body" className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-5 py-8 sm:px-10 sm:py-12">
              <ArticleBody blocks={post.blocks} />
              <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-500">Found this useful? Share it with a friend planning to study abroad.</p>
                <ShareButtons title={post.title} url={url} />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-8 rounded-2xl bg-[#0b2a45] text-white p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                Free advisory
              </span>
              <p className="mt-4 text-xl leading-snug tracking-tight">Planning to study {destination}?</p>
              <p className="mt-2 text-[15px] sm:text-base leading-relaxed text-white/70">
                Get a free one-to-one session with a Studwise counsellor about courses, universities and visas.
              </p>
              <CloudButton href={bookAppointmentHref} variant="white" size="sm" className="mt-6" target="_blank" rel="noopener noreferrer">
                Talk to an advisor
              </CloudButton>
            </div>
          </aside>
        </div>

        <div className="mt-20 sm:mt-28">
          <RelatedPosts posts={relatedPosts(post)} />
        </div>

        <div className="mt-20 sm:mt-28">
          <BlogCta />
        </div>
      </article>
    </div>
  );
}
