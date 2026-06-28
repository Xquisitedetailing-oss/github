"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PackageData, VehicleClass, vehicleClasses, getPrijs, formatPrijs } from "../data/pricing";

interface Props {
  open: boolean;
  onClose: () => void;
  vehicleClass: VehicleClass | null;
  pkg: PackageData | null;
}

export default function BookingModal({ open, onClose, vehicleClass, pkg }: Props) {
  const [form, setForm] = useState({
    naam: "",
    telefoon: "",
    email: "",
    automerk: "",
    kenteken: "",
    datum: "",
    opmerkingen: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const entry = pkg && vehicleClass ? getPrijs(pkg, vehicleClass) : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const waMessage = pkg && vehicleClass
    ? encodeURIComponent(
        `Hallo Xquisite! Ik wil een boeking aanvragen voor:\n\n` +
        `Pakket: ${pkg.naam}\n` +
        `Klasse: ${vehicleClasses[vehicleClass].label}\n` +
        `Prijs: ${entry ? formatPrijs(entry.prijs) : "Op aanvraag"}\n` +
        (form.naam ? `Naam: ${form.naam}\n` : "") +
        (form.automerk ? `Auto: ${form.automerk}\n` : "") +
        (form.datum ? `Gewenste datum: ${form.datum}\n` : "") +
        (form.opmerkingen ? `Opmerkingen: ${form.opmerkingen}` : "")
      )
    : "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full md:max-w-2xl bg-[#0d0d0d] border border-white/10 md:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="line-accent" />
                  <span className="caption text-[#29ABE2] text-xs">Stap 4</span>
                </div>
                <h3 className="text-white font-bold text-xl">Boeking aanvragen</h3>
                {pkg && vehicleClass && (
                  <p className="text-white/30 text-xs mt-1">
                    {pkg.naam} · {vehicleClasses[vehicleClass].label}
                    {entry && entry.prijs > 0 ? ` · ${formatPrijs(entry.prijs)}` : " · Op aanvraag"}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white/30 hover:text-white transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 text-center"
              >
                <div className="w-12 h-12 border border-[#29ABE2]/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-[#29ABE2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Aanvraag ontvangen</h4>
                <p className="text-white/35 text-sm max-w-xs mx-auto">
                  We nemen zo snel mogelijk contact met u op via telefoon of e-mail.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 caption bg-[#29ABE2] text-black px-8 py-3 hover:bg-white transition-colors duration-300"
                >
                  Sluiten
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Naam *" name="naam" value={form.naam} onChange={handleChange} required placeholder="Voor- en achternaam" />
                  <Field label="Telefoonnummer *" name="telefoon" type="tel" value={form.telefoon} onChange={handleChange} required placeholder="+31 6 00 00 00 00" />
                </div>
                <Field label="E-mailadres *" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="uwmail@voorbeeld.nl" />
                <Field label="Automerk & model *" name="automerk" value={form.automerk} onChange={handleChange} required placeholder="Bijv. BMW X5 M Competition" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Kenteken (optioneel)" name="kenteken" value={form.kenteken} onChange={handleChange} placeholder="AA-000-B" />
                  <Field label="Gewenste datum (optioneel)" name="datum" type="date" value={form.datum} onChange={handleChange} />
                </div>
                <div>
                  <label className="caption text-white/40 text-xs block mb-2">Opmerkingen (optioneel)</label>
                  <textarea
                    name="opmerkingen"
                    value={form.opmerkingen}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Eventuele wensen of bijzonderheden..."
                    className="w-full bg-white/[0.03] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-[#29ABE2]/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/31612345678?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-colors caption py-3.5 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Via WhatsApp
                  </a>
                  <button
                    type="submit"
                    className="flex-1 caption bg-[#29ABE2] text-black py-3.5 hover:bg-white transition-colors duration-300 text-sm flex items-center justify-center gap-2"
                  >
                    Aanvraag versturen
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label, name, value, onChange, type = "text", required, placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="caption text-white/40 text-xs block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-[#29ABE2]/50 transition-colors"
      />
    </div>
  );
}
