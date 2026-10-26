import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import HeroHeader from "@/components/hero/HeroHeader";
import ConsultationDialog from "@/components/shared/ConsultationDialog";
import RevealRoot from "@/components/shared/RevealRoot";
import ScrollWords from "@/components/shared/ScrollWords";
import FlightLane from "@/components/flight/FlightLane";
import { Eyebrow, Icon, StatCards, gutter, toneAt } from "@/components/shared/PageKit";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { serviceMenu } from "@/data/navigation";
import { getServiceDetail, serviceDetails } from "@/data/serviceDetails";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceDetail(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

/* Hero card: a soft wash in the brand's sky blues */
const HERO_WASH =
  "radial-gradient(ellipse at 0% 0%, #bfe3f7 0%, rgba(191,227,247,0) 55%), radial-gradient(ellipse at 100% 0%, #d9effb 0%, rgba(217,239,251,0) 50%), radial-gradient(ellipse at 100% 100%, #c6e6f8 0%, rgba(198,230,248,0) 60%), radial-gradient(ellipse at 0% 100%, #dceefa 0%, rgba(220,238,250,0) 55%), #eef7fd";

const ARROW = "M5 12h14m-6-6 6 6-6 6";

/* Benefit cards sit in one row when they fit; longer lists wrap in threes */
const BENEFIT_COLS: Record<number, string> = { 2: "", 3: "lg:grid-cols-3", 4: "xl:grid-cols-4" };

const h2 = "section-title text-slate-900";

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  const menu = serviceMenu.flatMap((g) => g.items);
  const hrefOf = (slug: string) => `/services/${slug}`;
  // Featured cards: each service's own hero photo and lead, under its menu name
  const featured = service.related.flatMap((slug) => {
    const s = getServiceDetail(slug);
    if (!s) return [];
    const href = hrefOf(slug);
    return [{ href, label: menu.find((i) => i.href === href)?.label ?? s.title, text: s.hero.lead, image: s.hero.image, alt: s.hero.alt, focus: s.hero.focus }];
  });
  const more = menu.filter((i) => i.href !== hrefOf(service.slug) && !featured.some((f) => f.href === i.href));

  return (
    <RevealRoot>
      <div className="bg-[#F1F5F9]">
        <HeroHeader />

        <div className={gutter}>
          {/* ---------------- Hero ---------------- */}
          <section aria-labelledby="service-heading" className="grid lg:grid-cols-12 gap-3 sm:gap-4">
            <div
              style={{ background: HERO_WASH }}
              className="lg:col-span-7 flex flex-col rounded-3xl ring-1 ring-slate-900/5 px-6 pt-6 pb-10 sm:px-10 sm:pt-8 sm:pb-14 lg:px-14 lg:pt-10 lg:pb-14 min-h-[30rem] lg:min-h-[calc(100svh-7.5rem)]"
            >
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
                  <li>
                    <Link
                      href="/"
                      className="inline-flex items-center h-8 px-3.5 rounded-full bg-white/80 text-slate-600 ring-1 ring-slate-900/5 transition-colors hover:bg-white hover:text-[#0a7fb3]"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <span className="inline-flex items-center h-8 px-3.5 rounded-full bg-white/80 text-slate-600 ring-1 ring-slate-900/5">Services</span>
                  </li>
                  <li>
                    <span aria-current="page" className="inline-flex items-center h-8 px-3.5 rounded-full bg-[#0a7fb3] text-white">
                      {service.title}
                    </span>
                  </li>
                </ol>
              </nav>

              <div className="flex-1 flex flex-col justify-center pt-12 lg:pt-8">
                <h1
                  id="service-heading"
                  className="banner-title text-slate-900"
                >
                  <span className="block">{service.hero.heading}</span> <span className="text-[#0a7fb3]">{service.hero.accent}</span>
                </h1>
                <p className="mt-6 sm:mt-8 max-w-[34rem] body-lead text-slate-600">{service.hero.lead}</p>
                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                  <WhatsAppButton size="md">{service.cta.button}</WhatsAppButton>
                  <a
                    href="#explore-services"
                    className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full bg-white ring-1 ring-slate-900/5 text-[15px] text-slate-800 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
                  >
                    Explore Our Services
                    <Icon d={ARROW} className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-5 min-h-[20rem] sm:min-h-[28rem] overflow-hidden rounded-3xl bg-slate-200">
              <Image
                src={service.hero.image}
                alt={service.hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: service.hero.focus }}
              />
            </div>
          </section>

          {/* ---------------- Overview ---------------- */}
          {/* The live page's opening sentence reads as an editorial statement
              (not a section title), with its paragraphs in columns below */}
          <section aria-labelledby="overview-heading" className="px-3 sm:px-6 lg:px-14 py-16 sm:py-20 lg:py-24">
            <div data-reveal className="max-w-5xl">
              <Eyebrow>Overview</Eyebrow>
              <h2 id="overview-heading" className="lead-statement mt-5 text-slate-900 text-balance">
                {service.overview.heading} <span className="text-[#0a7fb3]">{service.overview.accent}</span>
              </h2>
            </div>
            <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-200 grid md:grid-cols-2 gap-x-12 gap-y-4">
              {service.overview.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-reveal
                  style={{ "--d": `${(i + 1) * 0.06}s` } as CSSProperties}
                  className="body-text text-slate-600"
                >
                  {p}
                </p>
              ))}
            </div>

            {(service.figures || service.fields) && (
              <div className="mt-10 sm:mt-12 grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {service.figures && (
                  <StatCards reveal className={`grid-cols-2 gap-2.5 sm:gap-3 ${service.fields ? "lg:col-span-5" : "lg:col-span-12 sm:grid-cols-4"}`} items={service.figures} />
                )}
                {service.fields && (
                  <div data-reveal className={service.figures ? "lg:col-span-7" : "lg:col-span-12"}>
                    <h3 className="text-lg sm:text-xl tracking-tight text-slate-900">{service.fields.heading}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {service.fields.items.map((f) => (
                        <li key={f} className="rounded-full bg-white px-4 py-2 text-[14px] sm:text-[15px] text-slate-700 ring-1 ring-slate-900/[0.06]">
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-slate-500">{service.fields.note}</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ---------------- Benefits ---------------- */}
          <section aria-labelledby="benefits-heading" className="rounded-3xl bg-white ring-1 ring-slate-900/5 px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <h2 id="benefits-heading" data-reveal className={`lg:col-span-7 ${h2}`}>
                {service.benefits.heading}
              </h2>
              <p data-reveal className="lg:col-span-5 body-lead text-slate-600">
                {service.benefits.text}
              </p>
            </div>

            <ul className={`mt-12 sm:mt-16 grid sm:grid-cols-2 gap-2.5 sm:gap-3 ${BENEFIT_COLS[service.benefits.items.length] ?? "lg:grid-cols-3"}`}>
              {service.benefits.items.map((item, i) => {
                const tone = toneAt(i);
                return (
                  <li
                    key={item.title}
                    data-reveal
                    style={{ "--d": `${(i % 4) * 0.07}s` } as CSSProperties}
                    className={`relative rounded-2xl ${tone.bg} px-6 pb-7 pt-24 sm:px-7 sm:pb-8 sm:pt-32`}
                  >
                    <span className={`absolute top-5 right-5 sm:top-6 sm:right-6 grid place-items-center w-11 h-11 rounded-xl bg-white/80 ${tone.ink}`}>
                      <Icon d={item.icon} />
                    </span>
                    <h3 className="text-[1.4rem] sm:text-[1.6rem] leading-[1.1] tracking-[-0.03em] text-slate-900 text-balance">{item.title}</h3>
                    <p className="mt-3 body-text text-slate-700">{item.text}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ---------------- Quote ---------------- */}
          <section aria-label="Our approach" className="mt-3 sm:mt-4 rounded-3xl bg-[#0b2a45] text-white px-6 py-16 sm:px-12 sm:py-24 lg:px-20 lg:py-28">
            <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9.6 6C6.5 7.3 4.5 10 4.5 13.4V18h6v-6H7.6c.2-1.9 1.4-3.4 3.2-4.2L9.6 6Zm9 0c-3.1 1.3-5.1 4-5.1 7.4V18h6v-6h-2.9c.2-1.9 1.4-3.4 3.2-4.2L18.6 6Z" />
            </svg>
            <ScrollWords
              as="blockquote"
              text={service.quote}
              className="lead-statement mt-8 max-w-5xl"
            />
          </section>

          {/* ---------------- Process ---------------- */}
          <section aria-labelledby="process-heading" className="py-20 sm:py-28">
            {/* Heading and copy side by side from xl, sized to the same height */}
            <div className="grid xl:grid-cols-12 gap-x-12 gap-y-6 xl:items-center px-3 sm:px-5 lg:px-6">
              <h2
                id="process-heading"
                data-reveal
                className="section-title xl:col-span-6 text-slate-900 max-w-[14ch]"
              >
                {service.process.heading}
              </h2>
              {service.process.paragraphs.length > 0 && (
                <div className="xl:col-span-6 max-w-[52rem] space-y-4 body-text text-slate-600">
                  {service.process.paragraphs.map((p, i) => (
                    <p key={i} data-reveal style={{ "--d": `${i * 0.06}s` } as CSSProperties}>
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* The plane flies the steps in order */}
            <FlightLane
              label="Process steps, in order"
              showLabels={false}
              className="mt-8 sm:mt-12 pb-6"
              gridClassName={`gap-2.5 sm:gap-3 ${service.process.steps.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}
              stops={service.process.steps.map((step) => ({ label: step.title }))}
            />

            <ol className={`grid gap-2.5 sm:gap-3 ${service.process.steps.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {service.process.steps.map((step, i) => (
                <li
                  key={step.title}
                  data-reveal
                  style={{ "--d": `${i * 0.08}s` } as CSSProperties}
                  className="flex flex-col rounded-2xl px-6 py-7 sm:px-8 sm:py-8 bg-white ring-1 ring-slate-900/5"
                >
                  <h3 className="text-[1.25rem] sm:text-[1.5rem] leading-[1.15] tracking-[-0.03em] text-slate-900">{step.title}</h3>
                  <p className="mt-3 body-text text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------------- Other services ---------------- */}
          <section
            id="explore-services"
            aria-labelledby="explore-heading"
            className="scroll-mt-6 rounded-3xl bg-white ring-1 ring-slate-900/5 px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
          >
            <h2 id="explore-heading" className={h2}>
              Explore Other Services
            </h2>
            <ul className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-3 sm:gap-4">
              {featured.map((r, i) => (
                <li
                  key={r.href}
                  data-reveal
                  style={{ "--d": `${i * 0.07}s` } as CSSProperties}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#F6F9FC] ring-1 ring-slate-900/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                      style={{ objectPosition: r.focus }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl sm:text-[1.4rem] leading-snug tracking-[-0.02em] text-slate-900">{r.label}</h3>
                    <p className="mt-3 flex-1 body-text text-slate-600 line-clamp-3">{r.text}</p>
                    <Link
                      href={r.href}
                      className="mt-6 inline-flex items-center gap-2 text-[15px] text-[#0a7fb3] after:absolute after:inset-0 after:rounded-2xl"
                    >
                      Explore Service
                      <Icon d={ARROW} className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                      <span className="sr-only">: {r.label}</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            {more.length > 0 && (
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="shrink-0 text-sm text-slate-500">More services</p>
                <ul className="flex flex-wrap gap-2">
                  {more.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-2 h-10 pl-2 pr-4 rounded-full bg-[#F6F9FC] ring-1 ring-slate-900/5 text-sm text-slate-700 transition-colors hover:bg-sky-50 hover:ring-sky-100 hover:text-[#0a7fb3]"
                      >
                        <span className="grid place-items-center w-7 h-7 rounded-full bg-white text-[#0a7fb3]">
                          <Icon d={s.icon} className="w-4 h-4" />
                        </span>
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ---------------- CTA ----------------
              The office photo full-bleed in its own colours, with the copy
              set straight onto it; a soft neutral shade under the text only */}
          <section aria-labelledby="service-cta-heading" className="mt-3 sm:mt-4 pb-16 sm:pb-20 lg:pb-24">
            <div className="relative isolate overflow-hidden rounded-3xl text-white min-h-[40rem] sm:min-h-[40rem] lg:min-h-[44rem] flex items-end">
              <div data-reveal="clip" className="absolute inset-0 -z-20">
                <div className="absolute inset-0">
                  <Image src={service.cta.image} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: service.cta.focus }} />
                </div>
              </div>
              <div
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(6,20,34,0.85)_0%,rgba(6,20,34,0.62)_50%,rgba(6,20,34,0)_88%)] lg:bg-[linear-gradient(to_top,rgba(6,20,34,0.82)_0%,rgba(6,20,34,0.55)_40%,rgba(6,20,34,0)_72%)]"
                aria-hidden="true"
              />
              <div className="w-full grid lg:grid-cols-12 gap-x-12 gap-y-6 items-end px-6 pb-8 pt-40 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14">
                <h2
                  id="service-cta-heading"
                  data-reveal
                  className="section-title lg:col-span-7"
                >
                  {service.cta.heading}
                </h2>
                <div data-reveal style={{ "--d": "0.08s" } as CSSProperties} className="lg:col-span-5">
                  <p className="max-w-[30rem] body-lead text-white/90">{service.cta.text}</p>
                  <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                    <WhatsAppButton size="md">{service.cta.button}</WhatsAppButton>
                    <ConsultationDialog className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/40 text-[15px] text-white transition-colors hover:bg-white hover:text-[#0a7fb3]">
                      Talk to an advisor
                      <Icon d={ARROW} className="w-4 h-4" />
                    </ConsultationDialog>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </RevealRoot>
  );
}
