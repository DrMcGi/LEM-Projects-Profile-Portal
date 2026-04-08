"use client";

import { useEffect, useRef, useState } from "react";

export function SiteFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <footer className="border-t border-black/10 bg-white/85 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex justify-center rounded-2xl border border-teal-200/70 bg-teal-50/60 p-4 transition-colors duration-300 hover:border-teal-400 hover:bg-teal-50">
          <p className="text-center text-sm text-stone-700">
            Website built by{" "}
            <span ref={containerRef} className="group relative inline-block align-middle">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="font-semibold text-teal-800 underline decoration-teal-300 underline-offset-2 transition-colors duration-200 hover:text-teal-600 focus-visible:text-teal-600 focus-visible:outline-none"
                aria-label="DrMcGi contact details"
                aria-expanded={isOpen}
              >
                DrMcGi
              </button>

              <span className={`absolute bottom-full left-1/2 z-20 mb-2 hidden w-[min(92vw,22rem)] -translate-x-1/2 rounded-xl border border-teal-200 bg-white p-3 text-left text-xs leading-relaxed text-stone-700 shadow-lg transition duration-200 sm:block ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100`}>
                <span className="mt-1 block font-semibold text-teal-800">DrMcGi&apos;s SaaS Atelier (Pty) Ltd.</span>
                <span className="mt-1 block">Phone: 064 921 1745</span>
                <span className="block">Website: www.drmcgi.co.za</span>
                <span className="block">Email: giftk.rantho@gmail.com</span>
              </span>
            </span>
          </p>
        </div>
        <div className={`mt-3 overflow-hidden rounded-xl border border-teal-200 bg-white p-3 text-left text-xs leading-relaxed text-stone-700 shadow-sm transition sm:hidden ${isOpen ? "block" : "hidden"}`}>
          <span className="mt-1 block font-semibold text-teal-800">DrMcGi&apos;s SaaS Atelier (Pty) Ltd.</span>
          <span className="mt-1 block">Phone: 064 921 1745</span>
          <span className="block">Website: www.drmcgi.co.za</span>
          <span className="block">Email: giftk.rantho@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
