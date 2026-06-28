"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Martijn de Vries",
    location: "Groningen",
    rating: 5,
    text: "Absolute topkwaliteit. Mijn BMW zag er na de behandeling uit als nieuw. De keramische coating is prachtig en de service was uitstekend. Zeker een aanrader!",
    service: "Keramische Coating",
  },
  {
    name: "Sandra Hoekstra",
    location: "Assen",
    rating: 5,
    text: "Heel professioneel bedrijf. Ze hebben mijn auto van binnen en buiten perfect opgeknapt. De lakcorrectie heeft de swirl marks volledig verwijderd. Geweldig!",
    service: "Combi Pakket",
  },
  {
    name: "Peter Jansen",
    location: "Leeuwarden",
    rating: 5,
    text: "Al voor de derde keer gebruik gemaakt van X-quisite en telkens weer onder de indruk. Echte vakmannen die oog hebben voor detail. Beste detailer van de regio.",
    service: "Signature Package",
  },
  {
    name: "Lisa van den Berg",
    location: "Roden",
    rating: 5,
    text: "Mijn interieur was na een lange trip een ramp. Na de interieur detailing leek het wel een nieuwe auto. Super vriendelijk en vlot geholpen. Top!",
    service: "Interieur Detailing",
  },
  {
    name: "Koen Smit",
    location: "Drachten",
    rating: 5,
    text: "Polijsten gedaan voor een lakfout die al jaren zat. In één behandeling helemaal weg. Ongelooflijk goed werk. Prijs-kwaliteitverhouding is uitstekend.",
    service: "Polijsten & Lakcorrectie",
  },
  {
    name: "Annemiek Visser",
    location: "Emmen",
    rating: 5,
    text: "Mijn Range Rover heeft het signature package gekregen. Het resultaat is simpelweg verbluffend. Professioneel, punctueel en uiterst zorgvuldig. Echt 5 sterren waard.",
    service: "Signature Package",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#0066FF]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-black py-28 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0066FF]" />
              <span className="text-[#0066FF] text-xs font-semibold tracking-[0.3em] uppercase">
                Klantreviews
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
              Wat onze klanten zeggen
            </h2>
          </div>

          {/* Google badge */}
          <div className="flex items-center gap-4 border border-white/10 bg-white/3 px-6 py-4">
            <div>
              <p className="text-white font-black text-3xl">5.0</p>
              <Stars count={5} />
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide">Google Reviews</p>
              <p className="text-white font-semibold">Uitmuntend</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#0a0a0a] p-8 hover:bg-[#111] transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <Stars count={review.rating} />
                <span className="text-[#0066FF]/60 text-xs font-semibold tracking-wide uppercase">
                  {review.service}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-8 h-8 bg-[#0066FF]/20 flex items-center justify-center font-bold text-[#0066FF] text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-white/30 text-xs">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
