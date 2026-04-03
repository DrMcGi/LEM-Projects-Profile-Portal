"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

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

function ProfileViewport({ profilePdfPath }: { profilePdfPath: string | null }) {
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
      <div className="h-[70vh] min-h-136 bg-white">
        <iframe title="LEM Projects business profile" src={`${profilePdfPath}#view=FitH`} className="h-full w-full border-0" />
      </div>
    </div>
  );
}

export function ProjectsProfileExperience({ logoPath, profilePdfPath }: ProjectsProfileExperienceProps) {
  const profileAvailable = Boolean(profilePdfPath);

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
                <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Business profile
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["Business profile", "A complete company overview in one document."],
                  ["Capabilities", "A direct look at LEM Projects and its service focus."],
                  ["Contact", "Reach out directly for opportunities and discussions."],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-[1.4rem] border border-stone-200 bg-white/88 px-4 py-4">
                    <div className="text-sm font-bold uppercase tracking-[0.14em] text-stone-900">{title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-stone-600">{description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
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
                {[
                  "Company overview",
                  "Service offering",
                  "Direct contact details",
                ].map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-stone-200">
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {profileAvailable ? (
                  <MagneticAnchor href={profilePdfPath!} label="Open full profile" target="_blank" rel="noreferrer" />
                ) : null}
              </div>
            </motion.aside>

            <motion.div variants={revealUp}>
              <ProfileViewport profilePdfPath={profilePdfPath} />
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
              <div className="text-xs uppercase tracking-[0.24em] text-teal-300">Start here</div>
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
              <motion.div variants={revealUp} className="relative z-10 mt-8 flex flex-wrap gap-3">
                <MagneticAnchor href="mailto:info@lemprojects.co.za" label="Start a conversation" variant="secondary" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
