"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const reviews = [
  {
    name: "Martijn de Vries",
    location: "Groningen",
    rating: 5,
    text: "Absolute topkwaliteit. Mijn BMW zag er na de keramische coating behandeling uit alsof hij net de showroom verliet. De precisie en aandacht voor detail is ongeëvenaard.",
    service: "Keramische Coating",
    initials: "MV",
  },
  {
    name: "Sandra Hoekstra",
    location: "Assen",
    rating: 5,
    text: "Professioneel op elk niveau. Van de intake tot de levering — elk detail klopte. De lakcorrectie heeft swirl marks verwijderd die ik al jaren had. Geweldig resultaat.",
    service: "Premium Combi",
    initials: "SH",
  },
  {
    name: "Peter Jansen",
    location: "Leeuwarden",
    rating: 5,
    text: "Voor de derde keer gebruik gemaakt en telkens weer onder de indruk. Xquisite is geen detailer — het is een atelier. Echte vakmannen met oog voor perfectie.",
    service: "Signature Package",
    initials: "PJ",
    featured: true,
  },
  {
    name: "Lisa van den Berg",
    location: "Roden",
    rating: 5,
    text: "Na een lange roadtrip was mijn interieur een ramp. Na de premium interieur behandeling leek het een nieuwe auto. Vriendelijk, vlot en verbluffend resultaat.",
    service: "Premium Interieur",
    initials: "LB",
  },
  {
    name: "Koen Smit",
    location: "Drachten",
    rating: 5,
    text: "Een lakfout die al jaren zat, in één behandeling volledig weg. Ik had het niet voor mogelijk gehouden. Uitstekende prijs-kwaliteitverhouding voor dit niveau.",
    service: "Lakcorrectie",
    initials: "KS",
  },
  {
    name: "Annemiek Visser",
    location: "Emmen",
    rating: 5,
    text: "Mijn Range Rover heeft het signature package gekregen. Het resultaat is werkelijk verbluffend. Professioneel, punctueel en uiterst zorgvuldig. Absolute vijf sterren.",
    service: "Signature Package",
    initials: "AV",
    featured: true,
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-[#29ABE2]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="reviews" className="bg-[#030303] py-24 md:py-36 overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <span className="caption text-[#29ABE2]">Klantreviews</span>
            </div>
            <h2 className="heading-lg text-white">
              Wat onze<br />
              <span className="text-white/25">klanten zeggen</span>
            </h2>
          </div>

          {/* Google score badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-blue px-8 py-6 flex items-center gap-6"
          >
            <div>
              <p className="text-white font-black text-5xl leading-none">5.0</p>
              <Stars />
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="caption text-white/30 mb-1">Google Reviews</p>
              <p className="text-white font-bold text-lg">Uitmuntend</p>
            </div>
          </motion.div>
        </div>

        {/* Parallax rows */}
        <div ref={ref} className="space-y-4 overflow-hidden">
          {/* Row 1 */}
          <motion.div style={{ x: x1 }} className="flex gap-4">
            {reviews.slice(0, 3).map((r) => (
              <div
                key={r.name}
                className={`flex-shrink-0 w-[360px] p-7 border ${
                  r.featured ? "border-[#29ABE2]/20 bg-[#29ABE2]/3" : "border-white/5 bg-[#0a0a0a]"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Stars />
                  <span className="caption text-[#29ABE2]/50">{r.service}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-9 h-9 bg-[#29ABE2]/10 border border-[#29ABE2]/20 flex items-center justify-center font-bold text-[#29ABE2] text-sm">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-white/25 text-xs">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div style={{ x: x2 }} className="flex gap-4">
            {reviews.slice(3).map((r) => (
              <div
                key={r.name}
                className={`flex-shrink-0 w-[360px] p-7 border ${
                  r.featured ? "border-[#29ABE2]/20 bg-[#29ABE2]/3" : "border-white/5 bg-[#0a0a0a]"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Stars />
                  <span className="caption text-[#29ABE2]/50">{r.service}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-9 h-9 bg-[#29ABE2]/10 border border-[#29ABE2]/20 flex items-center justify-center font-bold text-[#29ABE2] text-sm">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-white/25 text-xs">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
