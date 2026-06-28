"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VehicleClass, Category, PackageData } from "../data/pricing";
import VehicleClassSelector from "./VehicleClassSelector";
import ServiceCategorySelector from "./ServiceCategorySelector";
import PackageSelector from "./PackageSelector";
import BookingSummary from "./BookingSummary";
import BookingModal from "./BookingModal";

type Step = 1 | 2 | 3;

export default function BookingConfigurator() {
  const [vehicleClass, setVehicleClass] = useState<VehicleClass | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const currentStep: Step = !vehicleClass ? 1 : !category ? 2 : 3;

  function handleVehicleSelect(klasse: VehicleClass) {
    setVehicleClass(klasse);
    setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  }

  function handleCategorySelect(cat: Category) {
    setCategory(cat);
    if (pkg && pkg.categorie !== cat) setPkg(null);
    setTimeout(() => step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  }

  function handlePackageSelect(p: PackageData) {
    setPkg(p);
  }

  return (
    <>
      <section id="boeking" className="bg-black py-24 md:py-36 px-6 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto md:px-12 lg:px-20">

          {/* Section header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="line-accent" />
              <span className="caption text-[#29ABE2]">Configurator</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="heading-lg text-white">
                Kies uw<br />
                <span className="text-white/25">behandeling</span>
              </h2>
              <p className="text-white/30 text-sm max-w-xs">
                Selecteer uw voertuigklasse, categorie en pakket.
                U ziet direct de prijs en tijdsduur.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: steps */}
            <div className="flex-1 min-w-0 space-y-12">

              {/* Step 1 */}
              <StepBlock step={1} title="Voertuigklasse" active={currentStep === 1} done={vehicleClass !== null}>
                <VehicleClassSelector selected={vehicleClass} onSelect={handleVehicleSelect} />
              </StepBlock>

              {/* Step 2 */}
              <div ref={step2Ref}>
                <StepBlock step={2} title="Behandeling" active={currentStep === 2} done={category !== null} locked={vehicleClass === null}>
                  <AnimatePresence>
                    {vehicleClass !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ServiceCategorySelector selected={category} onSelect={handleCategorySelect} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StepBlock>
              </div>

              {/* Step 3 */}
              <div ref={step3Ref}>
                <StepBlock step={3} title="Pakket" active={currentStep === 3} done={pkg !== null} locked={category === null}>
                  <AnimatePresence mode="wait">
                    {category !== null && vehicleClass !== null && (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                      >
                        <PackageSelector
                          category={category}
                          vehicleClass={vehicleClass}
                          selected={pkg}
                          onSelect={handlePackageSelect}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StepBlock>
              </div>
            </div>

            {/* Right: summary sticky */}
            <div className="w-full lg:w-80 lg:sticky lg:top-28 flex-shrink-0">
              <BookingSummary
                vehicleClass={vehicleClass}
                pkg={pkg}
                step={currentStep}
                onBook={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicleClass={vehicleClass}
        pkg={pkg}
      />
    </>
  );
}

function StepBlock({
  step, title, active, done, locked, children,
}: {
  step: number;
  title: string;
  active: boolean;
  done: boolean;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-8 h-8 flex items-center justify-center border text-xs font-bold transition-all duration-300 ${
          done
            ? "border-[#29ABE2] bg-[#29ABE2]/10 text-[#29ABE2]"
            : active
            ? "border-white/40 text-white"
            : "border-white/10 text-white/20"
        }`}>
          {done ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : step}
        </div>
        <h3 className={`font-bold text-lg transition-colors ${done ? "text-white" : active ? "text-white" : "text-white/30"}`}>
          {title}
        </h3>
      </div>

      {locked ? (
        <div className="border border-white/5 p-6 text-center">
          <p className="text-white/20 text-sm">Voltooi stap {step - 1} om door te gaan</p>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
}
