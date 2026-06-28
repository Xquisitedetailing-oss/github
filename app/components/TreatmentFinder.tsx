"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "voertuig",
    question: "Wat voor voertuig heeft u?",
    options: [
      { value: "sedan", label: "Sedan / Hatchback" },
      { value: "suv", label: "SUV / Crossover" },
      { value: "cabrio", label: "Cabrio / Coupé" },
      { value: "bestelwagen", label: "Bestelwagen / Bus" },
    ],
  },
  {
    id: "doel",
    question: "Wat is uw voornaamste doel?",
    options: [
      { value: "schoon", label: "Grondige reiniging" },
      { value: "krassen", label: "Krassen verwijderen" },
      { value: "beschermen", label: "Langdurige bescherming" },
      { value: "alles", label: "Het allerbeste resultaat" },
    ],
  },
  {
    id: "afwerking",
    question: "Welke afwerking prefereert u?",
    options: [
      { value: "mat", label: "Mat lak" },
      { value: "glanzend", label: "Glanzende lak" },
      { value: "weet_niet", label: "Geen voorkeur" },
      { value: "nieuw", label: "Nieuwe auto (beschermen)" },
    ],
  },
];

type Result = {
  title: string;
  description: string;
  price: string;
};

function getRecommendation(answers: Record<string, string>): Result {
  const { doel, afwerking } = answers;

  if (doel === "alles" || (doel === "beschermen" && afwerking !== "mat")) {
    return {
      title: "Signature Package",
      description:
        "Het allerbeste voor uw voertuig. Driestaps lakcorrectie, premium keramische coating en volledig maatwerk detailing van begin tot eind.",
      price: "Op aanvraag",
    };
  }
  if (doel === "beschermen" || afwerking === "nieuw") {
    return {
      title: "Keramische Coating",
      description:
        "De ultieme bescherming voor uw lak. Jarenlange hydrofobe werking, UV-bescherming en een glasachtige glans.",
      price: "Vanaf € 699",
    };
  }
  if (doel === "krassen") {
    return {
      title: "Polijsten & Lakcorrectie",
      description:
        "Professionele krassen- en swirl mark verwijdering. Uw lak wordt machinaal gepolijst tot showroomkwaliteit.",
      price: "Vanaf € 299",
    };
  }
  if (doel === "schoon") {
    return {
      title: "Combi Pakket",
      description:
        "Volledig interieur én exterieur detailing in één behandeling. De meest complete optie voor een perfecte presentatie.",
      price: "Vanaf € 249",
    };
  }
  return {
    title: "Combi Pakket",
    description:
      "Een uitstekende allround keuze. Volledig interieur én exterieur detailing voor maximale verzorging.",
    price: "Vanaf € 249",
  };
}

export default function TreatmentFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);

  const handleSelect = (value: string) => {
    const current = steps[step];
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setResult(getRecommendation(newAnswers));
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const progress = result ? 100 : (step / steps.length) * 100;

  return (
    <section id="finder" className="bg-[#050505] py-28 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#0066FF]" />
            <span className="text-[#0066FF] text-xs font-semibold tracking-[0.3em] uppercase">
              Behandeling Finder
            </span>
            <div className="w-8 h-px bg-[#0066FF]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight mb-4">
            Welke behandeling past bij u?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Beantwoord drie vragen en wij adviseren het ideale pakket voor uw situatie.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full bg-white/5 h-0.5 mb-12 max-w-2xl mx-auto">
          <motion.div
            className="h-full bg-[#0066FF]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              {/* Step counter */}
              <p className="text-center text-white/30 text-sm tracking-widest uppercase mb-6">
                Stap {step + 1} van {steps.length}
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                {steps[step].question}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {steps[step].options.map((opt) => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.value)}
                    className="group border border-white/10 hover:border-[#0066FF] bg-white/2 hover:bg-[#0066FF]/10 p-6 text-left transition-all duration-200"
                  >
                    <span className="text-white group-hover:text-[#0066FF] font-semibold text-lg transition-colors duration-200">
                      {opt.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 text-white/30 hover:text-white text-sm tracking-wide uppercase mx-auto block transition-colors"
                >
                  ← Vorige stap
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-[#0066FF]/20 border border-[#0066FF]/40 px-4 py-2 mb-6">
                <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" />
                <span className="text-[#0066FF] text-xs font-semibold tracking-[0.2em] uppercase">
                  Uw Aanbeveling
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                {result.title}
              </h3>
              <p className="text-white/60 text-lg max-w-lg mx-auto mb-6 leading-relaxed">
                {result.description}
              </p>
              <p className="text-[#0066FF] text-2xl font-bold mb-10">{result.price}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="bg-[#0066FF] hover:bg-[#3385FF] text-white font-bold px-10 py-4 tracking-wide uppercase transition-all duration-200 min-w-[220px]"
                >
                  Direct Aanvragen
                </a>
                <button
                  onClick={reset}
                  className="border border-white/20 hover:border-white/60 text-white/60 hover:text-white font-semibold px-10 py-4 tracking-wide uppercase transition-all duration-200 min-w-[220px]"
                >
                  Opnieuw Beginnen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
