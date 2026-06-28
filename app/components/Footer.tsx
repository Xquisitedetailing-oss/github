export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#0066FF] flex items-center justify-center">
                <span className="text-white font-black text-xs">X</span>
              </div>
              <div>
                <span className="text-white font-black text-lg tracking-wide uppercase">X-quisite</span>
                <span className="text-[#0066FF] font-light text-xs block tracking-[0.3em] uppercase -mt-1">Car Detailing</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Premium autodetailing in Roden. Wij verzorgen uw voertuig met de hoogste
              standaard vakmanschap in Groningen, Friesland en Drenthe.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Diensten</p>
            <ul className="space-y-2">
              {[
                "Interieur Detailing",
                "Exterieur Detailing",
                "Combi Pakketten",
                "Polijsten & Lakcorrectie",
                "Keramische Coating",
                "Signature Packages",
              ].map((s) => (
                <li key={s}>
                  <a href="#diensten" className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-white/40">
              <li>Roden, Drenthe</li>
              <li>
                <a href="mailto:info@xquisitedetailing.nl" className="hover:text-white transition-colors duration-200">
                  info@xquisitedetailing.nl
                </a>
              </li>
              <li>
                <a href="https://wa.me/31612345678" className="hover:text-[#25D366] transition-colors duration-200">
                  WhatsApp Direct
                </a>
              </li>
              <li className="pt-2 text-white/20">Ma–Za: 08:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>© {year} X-quisite Car Detailing. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacybeleid</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Algemene Voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
