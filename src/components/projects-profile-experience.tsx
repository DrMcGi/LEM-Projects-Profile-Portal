"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const introCards = [
  {
    title: "Ownership",
    bullets: ["100% Black woman-owned", "Level 1 B-BBEE"],
  },
  {
    title: "Capabilities",
    bullets: ["Reliable", "Innovative", "Strategic", "Expertise."],
  },
  {
    title: "Contact",
    description: "Reach out directly for opportunities and discussions.",
    contacts: true,
  },
  {
    title: "LEM CONNECT",
    description:
      "Empowering graduates with knowledge, mindset, and confidence to not just enter the workplace but to excel, lead, and thrive.",
    cta: {
      href: "https://teams.live.com/l/community/FEAyHPvlEsEDMEGzAM?v=g1",
      label: "CLICK TO JOIN",
    },
  },
] as const;

const profileContents = [
  { label: "Company overview", page: 2 },
  { label: "Service offering", page: 4 },
  { label: "Direct contact details", page: 7 },
] as const;

type ProjectsProfileExperienceProps = {
  logoPath: string | null;
  profilePdfPath: string | null;
};

type MagneticAnchorProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function MagneticAnchor({ href, label, variant = "primary", target, rel }: MagneticAnchorProps) {
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 190, damping: 18, mass: 0.4 });
  const springY = useSpring(offsetY, { stiffness: 190, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--glow-x", `${pointerX}px`);
    event.currentTarget.style.setProperty("--glow-y", `${pointerY}px`);

    offsetX.set((pointerX / bounds.width - 0.5) * 14);
    offsetY.set((pointerY / bounds.height - 0.5) * 12);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <a href={href} target={target} rel={rel} className={`magnetic-button ${variant === "secondary" ? "magnetic-button-secondary" : ""}`}>
        <span className="relative z-10">{label}</span>
      </a>
    </motion.div>
  );
}

function ContactIcon({ kind }: { kind: "whatsapp" | "phone" | "mail" }) {
  if (kind === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M20.52 3.48A11.84 11.84 0 0 0 12.07 0C5.55 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.91L0 24l6.47-1.7a11.8 11.8 0 0 0 5.6 1.43h.01c6.52 0 11.83-5.3 11.83-11.82 0-3.16-1.23-6.12-3.39-8.43Zm-8.45 18.26h-.01a9.8 9.8 0 0 1-4.98-1.36l-.36-.21-3.84 1 1.03-3.74-.24-.38a9.82 9.82 0 0 1-1.5-5.23C2.17 6.41 6.58 2 12 2c2.62 0 5.08 1.01 6.93 2.86a9.72 9.72 0 0 1 2.88 6.94c0 5.42-4.41 9.84-9.74 9.84Zm5.4-7.38c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.94 1.15-.17.2-.35.22-.64.08-.29-.15-1.24-.45-2.35-1.43-.87-.77-1.45-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.08-.15-.66-1.59-.91-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.08-.79.37-.27.29-1.04 1.01-1.04 2.47 0 1.45 1.06 2.86 1.2 3.05.15.2 2.08 3.18 5.05 4.46.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.56-.34Z" />
      </svg>
    );
  }

  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.58.11.35.03.74-.25 1.01l-2.2 2.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-7.47 4.67a1 1 0 0 1-1.06 0L4 8.24V6l8 5 8-5v2.24Z" />
    </svg>
  );
}

function ContactChip({ href, icon, value }: { href?: string; icon: ReactNode; value: string }) {
  const content = (
    <>
      <span className="text-teal-200">{icon}</span>
      <span>{value}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-2 text-sm font-semibold text-stone-100 transition hover:border-teal-300/40 hover:bg-white/10"
      >
        {content}
      </a>
    );
  }

  return <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-2 text-sm font-semibold text-stone-100">{content}</div>;
}

function IntroContactRow({ href, icon, value }: { href?: string; icon: ReactNode; value: string }) {
  const content = (
    <>
      <span className="text-teal-700">{icon}</span>
      <span className="min-w-0 break-all">{value}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="flex w-full items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-teal-300 hover:bg-teal-50"
      >
        {content}
      </a>
    );
  }

  return <div className="flex w-full items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-semibold text-stone-700">{content}</div>;
}

function MobileProfileViewer({
  profilePdfPath,
  selectedPage,
  onPageChange,
}: {
  profilePdfPath: string;
  selectedPage: number;
  onPageChange: (page: number) => void;
}) {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(selectedPage);
  const [pageImageUrl, setPageImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  useEffect(() => {
    let revokedUrl: string | null = null;
    let cancelled = false;

    async function renderPage() {
      try {
        setIsLoading(true);
        setHasError(false);

        const pdfjs = await import("pdfjs-dist");

        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.mjs",
          import.meta.url,
        ).toString();

        const loadingTask = pdfjs.getDocument(profilePdfPath);
        const pdf = await loadingTask.promise;

        if (cancelled) {
          return;
        }

        setPageCount(pdf.numPages);

        const safePage = Math.min(currentPage, pdf.numPages);
        if (safePage !== currentPage) {
          setCurrentPage(safePage);
        }

        const page = await pdf.getPage(safePage);
        const viewport = page.getViewport({ scale: 1.4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas context unavailable");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvas, canvasContext: context, viewport }).promise;

        if (cancelled) {
          return;
        }

        revokedUrl = canvas.toDataURL("image/png");
        setPageImageUrl(revokedUrl);
      } catch {
        if (!cancelled) {
          setHasError(true);
          setPageImageUrl(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void renderPage();

    return () => {
      cancelled = true;
      if (revokedUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(revokedUrl);
      }
    };
  }, [currentPage, profilePdfPath]);

  return (
    <div className="mobile-profile-viewer rounded-4xl border border-white/10 bg-white/6 p-4 md:hidden">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">Mobile viewer</div>
          <div className="mt-1 text-sm text-stone-300">
            {pageCount ? `Page ${currentPage} of ${pageCount}` : "Loading pages"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage <= 1 || isLoading}
            className="mobile-pdf-button"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => (pageCount ? Math.min(pageCount, page + 1) : page + 1))}
            disabled={!pageCount || currentPage >= pageCount || isLoading}
            className="mobile-pdf-button"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]">
        {hasError ? (
          <div className="flex min-h-96 flex-col items-center justify-center px-5 py-10 text-center text-stone-700">
            <div className="text-lg font-semibold text-stone-900">Unable to render the preview on this device.</div>
            <a href={profilePdfPath} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800">
              Open the full profile
            </a>
          </div>
        ) : isLoading || !pageImageUrl ? (
          <div className="flex min-h-96 items-center justify-center px-5 py-10 text-center text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
            Loading page...
          </div>
        ) : (
          <img src={pageImageUrl} alt={`LEM Projects business profile page ${currentPage}`} className="h-auto w-full object-contain" />
        )}
      </div>
    </div>
  );
}

function ProfileViewport({
  profilePdfPath,
  activePage,
  onPageChange,
}: {
  profilePdfPath: string | null;
  activePage: number;
  onPageChange: (page: number) => void;
}) {
  if (!profilePdfPath) {
    return (
      <div className="profile-empty-state flex min-h-112 flex-col items-center justify-center rounded-4xl border border-dashed border-white/20 px-6 py-10 text-center">
        <div className="text-xs uppercase tracking-[0.24em] text-teal-300">Profile pending</div>
        <h3 className="mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">Drop the LEM Projects business profile PDF into the public documents folder.</h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
          Expected file: public/documents/lem-projects-business-profile.pdf
        </p>
      </div>
    );
  }

  return (
    <div className="profile-browser overflow-hidden rounded-4xl border border-white/12 bg-white/4 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.7)]">
      <div className="profile-browser-bar flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="browser-dot browser-dot-red" />
          <span className="browser-dot browser-dot-amber" />
          <span className="browser-dot browser-dot-teal" />
        </div>
        <div className="hidden min-w-0 flex-1 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-center text-xs tracking-[0.16em] text-stone-300 sm:block">
          lemprojects.co.za/business-profile
        </div>
        <div className="rounded-full border border-teal-400/18 bg-teal-400/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-200">
          Live profile view
        </div>
      </div>
      <MobileProfileViewer profilePdfPath={profilePdfPath} selectedPage={activePage} onPageChange={onPageChange} />
      <div className="hidden h-[70vh] min-h-136 bg-white md:block">
        <iframe key={activePage} title="LEM Projects business profile" src={`${profilePdfPath}#page=${activePage}&view=FitH`} className="h-full w-full border-0" />
      </div>
    </div>
  );
}

export function ProjectsProfileExperience({ logoPath, profilePdfPath }: ProjectsProfileExperienceProps) {
  const profileAvailable = Boolean(profilePdfPath);
  const [activeProfilePage, setActiveProfilePage] = useState<number>(1);
  const [selectedContentPage, setSelectedContentPage] = useState<number | null>(null);

  const handleContentSelection = (page: number) => {
    setActiveProfilePage(page);
    setSelectedContentPage((currentPage) => (currentPage === page ? null : page));
  };

  return (
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-orb ambient-orb-teal -left-24 top-16" />
        <div className="ambient-orb ambient-orb-amber -right-32 top-120" />
        <div className="mesh-cloud mesh-cloud-teal left-[8%] top-28" />
        <div className="mesh-cloud mesh-cloud-amber right-[6%] top-160" />
        <div className="mesh-cloud mesh-cloud-stone bottom-36 left-[26%]" />
      </div>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <motion.section
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="rounded-[2.5rem] border border-white/60 bg-white/58 px-5 py-6 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-8 sm:py-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <motion.div variants={revealUp} className="inline-flex items-center gap-3 rounded-full border border-teal-200 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-teal-800">
                <span className="signal-dot" />
                LEM Projects profile portal
              </motion.div>
              <motion.h1 variants={revealUp} className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] text-stone-900 sm:text-6xl">
                Strategic execution,
                <span className="block text-transparent bg-linear-to-r from-teal-800 via-teal-500 to-amber-500 bg-clip-text">
                  presented like a flagship brief.
                </span>
              </motion.h1>
              <motion.p variants={revealUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700 sm:text-xl">
                Explore the LEM Projects business profile for a clear view of the company, its service offering, and its delivery approach.
              </motion.p>
              <motion.p variants={revealUp} className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
                Everything you need to know is presented in one place, with direct access to contact details when you are ready to talk.
              </motion.p>
            </div>

            <motion.div variants={revealUp} className="rounded-4xl border border-stone-200/80 bg-stone-50/90 p-5 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.28)]">
              <div className="flex items-start justify-between gap-4">
                <div className="relative flex h-18 w-18 items-center justify-center overflow-hidden rounded-3xl border border-white/80 bg-white shadow-sm">
                  {logoPath ? (
                    <Image src={logoPath} alt="LEM Projects logo" fill sizes="72px" className="object-contain p-3" priority />
                  ) : (
                    <span className="text-sm font-bold tracking-[0.16em] text-teal-800">LEM</span>
                  )}
                </div>
                <a href="#business-profile" className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Business profile
                </a>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {introCards.map((card) => (
                  <div key={card.title} className="flex h-full min-h-56 flex-col rounded-[1.4rem] border border-stone-200 bg-white/88 px-4 py-4">
                    <div className="text-[0.95rem] font-bold uppercase leading-tight tracking-[0.12em] text-stone-900">{card.title}</div>
                    {"bullets" in card ? (
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600">
                        {card.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-2 text-sm leading-relaxed text-stone-600">{card.description}</div>
                    )}
                    {"contacts" in card ? (
                      <div className="mt-4 space-y-2">
                        <IntroContactRow href="https://wa.me/27764807410" icon={<ContactIcon kind="whatsapp" />} value="0764807410" />
                        <IntroContactRow href="tel:0823740090" icon={<ContactIcon kind="phone" />} value="0823740090" />
                        <IntroContactRow icon={<ContactIcon kind="mail" />} value="info@lemprojects.co.za" />
                      </div>
                    ) : null}
                    {"cta" in card ? (
                      <a
                        href={card.cta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="intro-panel-button mt-auto w-full"
                      >
                        {card.cta.label}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="business-profile"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="viewer-stage overflow-hidden rounded-[2.5rem] border border-white/12 px-4 py-4 text-white shadow-[0_42px_110px_-60px_rgba(0,0,0,0.9)] sm:px-6 sm:py-6"
        >
          <div className="viewer-grid grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            <motion.aside variants={revealUp} className="space-y-5 rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-teal-300">Business profile</div>
                <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Explore the LEM Projects company profile.</h2>
              </div>

              <p className="text-base leading-relaxed text-stone-300">
                View the full profile below for an overview of the business, its service offering, and the contact details needed to start a conversation.
              </p>

              <div className="space-y-3">
                {profileContents.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleContentSelection(item.page)}
                    className={`w-full rounded-[1.25rem] border px-4 py-3 text-left text-sm transition ${
                      selectedContentPage === item.page
                        ? "border-teal-300/35 bg-teal-400/12 text-white"
                        : "border-white/10 bg-white/6 text-stone-200 hover:border-white/18 hover:bg-white/8"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {profileAvailable ? (
                  <MagneticAnchor href={profilePdfPath!} label="Open full profile" target="_blank" rel="noreferrer" />
                ) : null}
              </div>
            </motion.aside>

            <motion.div variants={revealUp}>
              <ProfileViewport profilePdfPath={profilePdfPath} activePage={activeProfilePage} onPageChange={setActiveProfilePage} />
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.28 }}
          className="final-frame overflow-hidden rounded-[2.5rem] border border-white/60 px-6 py-10 text-white shadow-[0_40px_110px_-55px_rgba(0,0,0,0.8)] sm:px-10"
        >
          <div className="closing-aurora" aria-hidden />
          <div className="final-ghost-grid projects-ghost-grid" aria-hidden>
            <span>Projects</span>
            <span>Strategy</span>
            <span>Execution</span>
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <motion.div variants={revealUp} className="final-mark">
              <div className="text-xs uppercase tracking-[0.24em] text-teal-300">Contact us</div>
              <div className="final-mark-shell mt-5">
                {logoPath ? (
                  <Image src={logoPath} alt="LEM Projects logo" width={360} height={220} className="mx-auto h-auto w-full max-w-[16rem] object-contain" />
                ) : (
                  <div className="holding-logo-fallback">LEM Projects</div>
                )}
              </div>
              <div className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
                Strategic and operational project support.
              </div>
            </motion.div>

            <div>
              <motion.h2 variants={revealUp} className="relative z-10 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                Ready to discuss your next project?
              </motion.h2>
              <motion.p variants={revealUp} className="relative z-10 mt-6 max-w-3xl text-lg leading-relaxed text-stone-200">
                Connect with LEM Projects to discuss requirements, opportunities, and the right path forward for your project needs.
              </motion.p>
              <motion.div variants={revealUp} className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
                <MagneticAnchor href="mailto:info@lemprojects.co.za" label="Start a conversation" variant="secondary" />
                <ContactChip href="https://wa.me/27764807410" icon={<ContactIcon kind="whatsapp" />} value="0764807410" />
                <ContactChip href="tel:0823740090" icon={<ContactIcon kind="phone" />} value="0823740090" />
                <ContactChip icon={<ContactIcon kind="mail" />} value="info@lemprojects.co.za" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
