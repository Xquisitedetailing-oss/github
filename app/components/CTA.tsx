"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const waLink =
    "https://wa.me/31612345678?text=Hallo%20Xquisite%2C%20ik%20wil%20graag%20een%20offerte%20aanvragen.";

  return (
    <section id="contact" ref={ref} className="bg-black py-12 md:py-24 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto md:px-12 lg:px-20">
        <motion.div
          style={{ scale, opacity }}
          className="relative overflow-hidden border border-[#29ABE2]/15 bg-[#030303] p-12 md:p-20"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#29ABE2]/5 blur-3xl rounded-full pointer-events-none" />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-px bg-[#29ABE2]" />
          <div className="absolute top-0 left-0 w-px h-16 bg-[#29ABE2]" />
          <div className="absolute bottom-0 right-0 w-16 h-px bg-[#29ABE2]" />
          <div className="absolute bottom-0 right-0 w-px h-16 bg-[#29ABE2]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="line-accent" />
                <span className="caption text-[#29ABE2]">Direct Contact</span>
              </div>
              <h2 className="heading-lg text-white mb-6">
                Klaar voor een<br />
                <span className="text-[#29ABE2]">perfecte auto?</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-lg">
                Neem direct contact op via WhatsApp of e-mail voor een vrijblijvende offerte op maat.
                Wij reageren doorgaans binnen enkele uren.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/30">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Roden, Drenthe
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ma–Za: 08:00–18:00
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Noord-Nederland
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0 w-full lg:w-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold caption px-10 py-5 transition-all duration-300 min-w-[260px]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:info@xquisitedetailing.nl"
                className="flex items-center justify-center gap-3 border border-white/15 hover:border-[#29ABE2] text-white hover:text-[#29ABE2] font-bold caption px-10 py-5 transition-all duration-300 min-w-[260px]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-mail Sturen
              </a>
              <a
                href="#configurator"
                className="flex items-center justify-center gap-3 bg-white/3 hover:bg-[#29ABE2]/10 border border-white/10 hover:border-[#29ABE2]/30 text-white/60 hover:text-white caption px-10 py-4 transition-all duration-300 min-w-[260px]"
              >
                Prijs Berekenen
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
