"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export const portfolioItems = [
  {
    id: "bmw-x5",
    title: "BMW X5 M Competition",
    service: "Keramische Coating",
    description:
      "Volledig lakcorrectieprogramma gevolgd door professionele keramische coating. Resultaat: een diepzwarte spiegel­glans die maandenlang beschermd blijft.",
    src: "/images/bmw-x5.jpg",
    alt: "Zwarte BMW X5 M Competition na keramische coating door Xquisite Car Detailing",
    available: true,
  },
  {
    id: "audi-q8",
    title: "Audi RSQ8",
    service: "Signature Correction Package",
    description:
      "Driestaps lakcorrectie op de aggressive RSQ8 lak. Elke hoek, elk stuk carrosserie behandeld met machinale precisie.",
    src: "/images/audi-q8.jpg",
    alt: "Zwarte Audi RSQ8 na signature lakcorrectie door Xquisite Car Detailing",
    available: true,
  },
  {
    id: "placeholder-3",
    title: "Porsche 911",
    service: "Premium Combi Pakket",
    description: "Volledig combi pakket — interieur en exterieur tot in de puntjes verzorgd.",
    src: null,
    alt: "Porsche 911 na behandeling",
    available: false,
  },
];

function PortfolioCard({
  item,
  index,
  onSelect,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="group relative overflow-hidden cursor-pointer"
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
        {item.available && item.src ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] border border-white/5">
            <div className="w-12 h-12 border border-[#29ABE2]/20 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#29ABE2]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="caption text-white/15">Foto binnenkort</p>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Blue accent line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29ABE2] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Expand icon */}
        {item.available && (
          <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="pt-5 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg leading-tight">{item.title}</p>
            <p className="caption text-[#29ABE2] mt-1">{item.service}</p>
          </div>
          {item.available && (
            <svg
              className="w-4 h-4 text-white/20 group-hover:text-[#29ABE2] flex-shrink-0 mt-1 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: (typeof portfolioItems)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-pointer"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative max-w-5xl w-full cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 caption text-white/40 hover:text-white flex items-center gap-2 transition-colors"
        >
          Sluiten
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {item.src && (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="mt-5 flex items-start justify-between">
          <div>
            <h3 className="text-white font-bold text-2xl">{item.title}</h3>
            <p className="caption text-[#29ABE2] mt-1 mb-3">{item.service}</p>
            <p className="text-white/40 text-sm max-w-xl">{item.description}</p>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="flex-shrink-0 caption bg-[#29ABE2] text-black px-6 py-3 hover:bg-white transition-colors duration-300 flex items-center gap-2"
          >
            Zelfde voor mijn auto
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headerOp = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <>
      <section id="portfolio" ref={ref} className="bg-black py-24 md:py-36 px-6 overflow-hidden border-t border-white/5">
        <div className="max-w-[1600px] mx-auto md:px-12 lg:px-20">
          {/* Header */}
          <motion.div style={{ y: headerY, opacity: headerOp }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <span className="caption text-[#29ABE2]">Portfolio</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="heading-lg text-white">
                Ons werk<br />
                <span className="text-white/25">in beeld</span>
              </h2>
              <p className="text-white/30 text-sm max-w-xs">
                Elk voertuig vertelt een verhaal. Dit zijn onze projecten —
                elk resultaat is het bewijs van obsessieve precisie.
              </p>
            </div>
          </motion.div>

          {/* Featured — full width first photo */}
          {portfolioItems[0].available && portfolioItems[0].src && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="group relative mb-4 overflow-hidden cursor-pointer"
              onClick={() => setSelected(0)}
            >
              <div className="relative w-full aspect-[21/9] overflow-hidden bg-[#0a0a0a]">
                <Image
                  src={portfolioItems[0].src}
                  alt={portfolioItems[0].alt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Overlay content */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                  <span className="caption text-[#29ABE2] mb-2 block">{portfolioItems[0].service}</span>
                  <h3 className="text-white font-black text-3xl md:text-5xl leading-none mb-2">
                    {portfolioItems[0].title}
                  </h3>
                  <p className="text-white/40 text-sm max-w-sm hidden md:block">
                    {portfolioItems[0].description}
                  </p>
                </div>

                {/* View button */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="glass px-4 py-2 caption text-white/70 flex items-center gap-2">
                    Bekijken
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29ABE2] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </motion.div>
          )}

          {/* Grid — remaining items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioItems.slice(1).map((item, i) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={i}
                onSelect={() => item.available ? setSelected(i + 1) : undefined}
              />
            ))}
          </div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 border-t border-white/5 pt-8 flex items-center justify-between"
          >
            <p className="text-white/25 text-sm">
              Meer projecten worden regelmatig toegevoegd.
            </p>
            <a
              href="#contact"
              className="caption text-[#29ABE2] hover:text-white flex items-center gap-2 transition-colors duration-300"
            >
              Uw auto als volgend project?
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && portfolioItems[selected]?.available && (
          <Lightbox
            item={portfolioItems[selected]}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
