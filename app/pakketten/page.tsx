import { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import { categoryMeta } from "../data/pricing";

export const metadata: Metadata = {
  title: "Alle Pakketten | X-quisite Car Detailing",
  description:
    "Overzicht van alle detailing pakketten: interieur, exterieur, combi, lakcorrectie en keramische coating.",
};

const categories = Object.entries(categoryMeta);

export default function PakkettenPage() {
  return (
    <>
      <Nav />
      <main className="bg-black min-h-screen">
        <div className="h-20" />
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0066FF]" />
              <span className="text-[#0066FF] text-xs font-semibold tracking-[0.3em] uppercase">
                Alle Diensten
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Pakketten
            </h1>
            <p className="text-white/40 text-xl max-w-xl mb-16 leading-relaxed">
              Kies uw categorie en bekijk alle prijzen per voertuigklasse.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(([key, meta]) => (
                <Link
                  key={key}
                  href={`/pakketten/${meta.slug}`}
                  className="group flex items-start gap-5 p-7 border border-white/10 hover:border-[#0066FF]/50 bg-white/2 hover:bg-[#0066FF]/5 transition-all duration-300"
                >
                  <span className="text-4xl">{meta.icon}</span>
                  <div>
                    <h2 className="text-white font-bold text-xl mb-2 group-hover:text-[#0066FF] transition-colors duration-200">
                      {meta.title}
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed">{meta.beschrijving}</p>
                    <p className="text-[#0066FF] text-xs font-semibold tracking-wide uppercase mt-4 group-hover:translate-x-1 transition-transform duration-200">
                      Bekijk pakketten →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
