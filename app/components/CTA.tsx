"use client";

import { motion } from "framer-motion";

export default function CTA() {
  const waLink =
    "https://wa.me/31612345678?text=Hallo%20X-quisite%2C%20ik%20wil%20graag%20een%20offerte%20aanvragen.";

  return (
    <section id="contact" className="relative bg-[#050505] py-28 px-6 border-t border-white/5 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-xs font-semibold tracking-[0.3em] uppercase">
              Direct Contact
            </span>
            <div className="w-8 h-px bg-[#0066FF]" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-6">
            Klaar voor een perfecte auto?
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Neem direct contact op via WhatsApp of mail voor een vrijblijvende offerte.
            Wij reageren doorgaans binnen enkele uren.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold px-10 py-4 text-base tracking-wide uppercase transition-all duration-200 min-w-[260px] justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Ons
            </a>
            <a
              href="mailto:info@xquisitedetailing.nl"
              className="flex items-center gap-3 border border-white/20 hover:border-[#0066FF] text-white hover:text-[#0066FF] font-bold px-10 py-4 text-base tracking-wide uppercase transition-all duration-200 min-w-[260px] justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Stuur een Mail
            </a>
          </div>

          {/* Info row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Roden, Drenthe
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ma–Za: 08:00–18:00
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Heel Noord-Nederland
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
