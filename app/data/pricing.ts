export type VehicleClass = 1 | 2 | 3 | 4 | 5;
export type PackageLevel = "standaard" | "deluxe" | "premium";
export type CorrectionLevel = "deluxe" | "premium" | "signature";
export type Category =
  | "interieur"
  | "exterieur"
  | "combi"
  | "correction"
  | "coating";

export interface PricingEntry {
  klasse: VehicleClass;
  prijs: number;
  duur: string; // human-readable e.g. "1u 30m"
  duurMinuten: number;
}

export interface PackageData {
  id: string;
  naam: string;
  level: PackageLevel | CorrectionLevel;
  categorie: Category;
  beschrijving: string;
  inbegrepen: string[];
  aanbevolen?: string; // upgrade recommendation ID
  prijzen: Record<VehicleClass, PricingEntry>;
  memberPrijzen?: Record<VehicleClass, PricingEntry>; // Fresh & Clean 15% korting
  highlight?: boolean;
  badge?: string;
}

export const vehicleClasses: Record<
  VehicleClass,
  { label: string; voorbeelden: string; icon: string }
> = {
  1: {
    label: "Klasse 1",
    voorbeelden: "Polo, Fiesta, Mini, Yaris",
    icon: "🚗",
  },
  2: {
    label: "Klasse 2",
    voorbeelden: "Golf, A4, 3-serie, Focus",
    icon: "🚙",
  },
  3: {
    label: "Klasse 3",
    voorbeelden: "5-serie, E-klasse, Passat",
    icon: "🚘",
  },
  4: {
    label: "Klasse 4",
    voorbeelden: "X5, Q7, Discovery, Touareg",
    icon: "🛻",
  },
  5: {
    label: "Klasse 5",
    voorbeelden: "Sprinter, Transporter, Limousine",
    icon: "🚐",
  },
};

// ─── HELPER ────────────────────────────────────────────────────────────────
function min(h: number, m: number): number {
  return h * 60 + m;
}
function dur(h: number, m: number): string {
  return m === 0 ? `${h} uur` : `${h}u ${m}m`;
}
function entry(
  klasse: VehicleClass,
  prijs: number,
  h: number,
  m: number
): PricingEntry {
  return { klasse, prijs, duur: dur(h, m), duurMinuten: min(h, m) };
}

// ─── 1. INTERIEUR ─────────────────────────────────────────────────────────
export const interieurStandaard: PackageData = {
  id: "interieur-standaard",
  naam: "Standaard Interieur",
  level: "standaard",
  categorie: "interieur",
  beschrijving:
    "Grondige reiniging van het volledige interieur. Ideaal voor regulier onderhoud en een frisse start.",
  inbegrepen: [
    "Vacuüm volledig interieur",
    "Dashboard & console reiniging",
    "Stoelen en vloermatten",
    "Ramen van binnen gereinigd",
    "Deurrubbers en dorpels",
  ],
  aanbevolen: "interieur-deluxe",
  badge: undefined,
  prijzen: {
    1: entry(1, 89.95, 1, 30),
    2: entry(2, 99.95, 1, 40),
    3: entry(3, 104.95, 1, 50),
    4: entry(4, 104.95, 1, 50),
    5: entry(5, 109.95, 1, 55),
  },
  memberPrijzen: {
    1: entry(1, 78.22, 1, 30),
    2: entry(2, 88.22, 1, 40),
    3: entry(3, 93.22, 1, 50),
    4: entry(4, 93.22, 1, 50),
    5: entry(5, 98.22, 1, 55),
  },
};

export const interieurDeluxe: PackageData = {
  id: "interieur-deluxe",
  naam: "Deluxe Interieur",
  level: "deluxe",
  categorie: "interieur",
  beschrijving:
    "Uitgebreide interieurbehandeling met diepreiniging van alle oppervlakken, inclusief leder- of stofreinigung.",
  inbegrepen: [
    "Alles uit Standaard",
    "Diepreiniging stoelen & tapijt",
    "Leder- of stofreinigung",
    "Dashboard polish & bescherming",
    "Airco reiniging",
    "Geursanering",
  ],
  aanbevolen: "interieur-premium",
  badge: "Populair",
  highlight: true,
  prijzen: {
    1: entry(1, 179.95, 2, 30),
    2: entry(2, 194.95, 2, 30),
    3: entry(3, 199.95, 2, 30),
    4: entry(4, 204.95, 2, 40),
    5: entry(5, 209.95, 2, 50),
  },
  memberPrijzen: {
    1: entry(1, 156.48, 2, 29),
    2: entry(2, 171.48, 2, 30),
    3: entry(3, 176.48, 2, 30),
    4: entry(4, 181.48, 2, 40),
    5: entry(5, 186.48, 2, 50),
  },
};

export const interieurPremium: PackageData = {
  id: "interieur-premium",
  naam: "Premium Interieur",
  level: "premium",
  categorie: "interieur",
  beschrijving:
    "Het absolute topniveau voor interieurdetailing. Elke centimeter wordt behandeld met professionele producten en maximale aandacht.",
  inbegrepen: [
    "Alles uit Deluxe",
    "Machinale extractie tapijt & stoelen",
    "Lederbehandeling & conditionering",
    "Plafond reiniging",
    "Complete ozonsanering",
    "Beschermende coating interieur",
    "Behandelrapport",
  ],
  badge: "Premium",
  prijzen: {
    1: entry(1, 299.95, 4, 30),
    2: entry(2, 319.95, 4, 40),
    3: entry(3, 324.95, 4, 50),
    4: entry(4, 329.95, 4, 55),
    5: entry(5, 339.95, 5, 5),
  },
  memberPrijzen: {
    1: entry(1, 260.83, 4, 30),
    2: entry(2, 280.83, 4, 40),
    3: entry(3, 285.83, 4, 50),
    4: entry(4, 290.83, 4, 55),
    5: entry(5, 300.83, 5, 15),
  },
};

// ─── 2. EXTERIEUR ─────────────────────────────────────────────────────────
export const exterieurStandaard: PackageData = {
  id: "exterieur-standaard",
  naam: "Standaard Exterieur",
  level: "standaard",
  categorie: "exterieur",
  beschrijving:
    "Professionele buitenreiniging voor een stralende presentatie. Handwas, velgen en banden.",
  inbegrepen: [
    "Professionele handwas",
    "Velgen & banden reiniging",
    "Deurrubbers gereinigd",
    "Ramen & spiegels",
    "Deurdrempels",
  ],
  aanbevolen: "exterieur-deluxe",
  prijzen: {
    1: entry(1, 94.95, 1, 0),
    2: entry(2, 104.95, 1, 15),
    3: entry(3, 109.95, 1, 25),
    4: entry(4, 109.95, 1, 25),
    5: entry(5, 114.95, 1, 25),
  },
  memberPrijzen: {
    1: entry(1, 82.57, 1, 15),
    2: entry(2, 92.57, 1, 25),
    3: entry(3, 97.57, 1, 25),
    4: entry(4, 97.57, 1, 25),
    5: entry(5, 102.57, 1, 25),
  },
};

export const exterieurDeluxe: PackageData = {
  id: "exterieur-deluxe",
  naam: "Deluxe Exterieur",
  level: "deluxe",
  categorie: "exterieur",
  beschrijving:
    "Complete exterieurbehandeling inclusief clay bar decontaminatie en wax bescherming.",
  inbegrepen: [
    "Alles uit Standaard",
    "Clay bar decontaminatie",
    "Lak sealant applicatie",
    "Velgen coating",
    "Bandenwax",
    "Motorkap polish",
  ],
  aanbevolen: "exterieur-premium",
  badge: "Populair",
  highlight: true,
  prijzen: {
    1: entry(1, 114.95, 1, 25),
    2: entry(2, 129.95, 1, 35),
    3: entry(3, 134.95, 1, 40),
    4: entry(4, 139.95, 1, 50),
    5: entry(5, 144.95, 2, 0),
  },
  memberPrijzen: {
    1: entry(1, 78.22, 1, 25),
    2: entry(2, 93.22, 1, 35),
    3: entry(3, 98.22, 1, 20),
    4: entry(4, 103.22, 1, 50),
    5: entry(5, 108.22, 2, 0),
  },
};

export const exterieurPremium: PackageData = {
  id: "exterieur-premium",
  naam: "Premium Exterieur",
  level: "premium",
  categorie: "exterieur",
  beschrijving:
    "Maximale exterieurbescherming met premium wax, volledige decontaminatie en glasbehandeling.",
  inbegrepen: [
    "Alles uit Deluxe",
    "Premium carnauba wax",
    "Volledig glasbehandeling",
    "Rubberen afdichtingen behandeld",
    "Motorruimte reiniging",
    "Behandelrapport",
  ],
  badge: "Premium",
  prijzen: {
    1: entry(1, 134.95, 2, 10),
    2: entry(2, 154.95, 2, 20),
    3: entry(3, 159.95, 2, 30),
    4: entry(4, 164.95, 2, 30),
    5: entry(5, 174.95, 2, 40),
  },
  memberPrijzen: {
    1: entry(1, 117.35, 2, 10),
    2: entry(2, 137.35, 2, 20),
    3: entry(3, 142.35, 2, 30),
    4: entry(4, 147.35, 2, 30),
    5: entry(5, 157.35, 2, 40),
  },
};

// ─── 3. COMBI ─────────────────────────────────────────────────────────────
export const combiStandaard: PackageData = {
  id: "combi-standaard",
  naam: "Standaard Combi",
  level: "standaard",
  categorie: "combi",
  beschrijving:
    "Interieur én exterieur in één behandeling. De complete keuze voor een perfecte verzorging.",
  inbegrepen: [
    "Standaard Interieur behandeling",
    "Standaard Exterieur behandeling",
    "Ramen volledig gereinigd",
    "Velgen & banden",
    "Gratis nazorgadvies",
  ],
  aanbevolen: "combi-deluxe",
  prijzen: {
    1: entry(1, 149.95, 2, 30),
    2: entry(2, 159.95, 2, 40),
    3: entry(3, 164.95, 2, 45),
    4: entry(4, 164.95, 2, 45),
    5: entry(5, 169.95, 2, 50),
  },
  memberPrijzen: {
    1: entry(1, 130.39, 2, 30),
    2: entry(2, 140.39, 2, 40),
    3: entry(3, 145.39, 2, 45),
    4: entry(4, 145.39, 2, 45),
    5: entry(5, 150.39, 2, 50),
  },
};

export const combiDeluxe: PackageData = {
  id: "combi-deluxe",
  naam: "Deluxe Combi",
  level: "deluxe",
  categorie: "combi",
  beschrijving:
    "Uitgebreide combibehandeling met diepreiniging binnen en buiten. De meest gekozen optie.",
  inbegrepen: [
    "Deluxe Interieur behandeling",
    "Deluxe Exterieur behandeling",
    "Motorruimte reiniging",
    "Clay bar decontaminatie",
    "Lak sealant",
    "Geursanering",
  ],
  aanbevolen: "combi-premium",
  badge: "Beste Waarde",
  highlight: true,
  prijzen: {
    1: entry(1, 239.95, 4, 0),
    2: entry(2, 254.95, 4, 10),
    3: entry(3, 259.95, 4, 20),
    4: entry(4, 264.95, 4, 20),
    5: entry(5, 269.95, 4, 30),
  },
  memberPrijzen: {
    1: entry(1, 208.65, 4, 0),
    2: entry(2, 223.65, 4, 10),
    3: entry(3, 228.65, 4, 20),
    4: entry(4, 233.65, 4, 30),
    5: entry(5, 238.65, 4, 40),
  },
};

export const combiPremium: PackageData = {
  id: "combi-premium",
  naam: "Premium Combi",
  level: "premium",
  categorie: "combi",
  beschrijving:
    "Het allerbeste voor uw voertuig. Volledig maatwerk behandeling met premium producten.",
  inbegrepen: [
    "Premium Interieur behandeling",
    "Premium Exterieur behandeling",
    "Machinale tapijt- en bekleding extractie",
    "Premium carnauba wax",
    "Glascoating",
    "Volledig behandelrapport",
  ],
  badge: "Premium",
  prijzen: {
    1: entry(1, 359.95, 5, 0),
    2: entry(2, 379.95, 5, 20),
    3: entry(3, 384.95, 5, 30),
    4: entry(4, 389.95, 5, 45),
    5: entry(5, 399.95, 6, 10),
  },
  memberPrijzen: {
    1: entry(1, 313.0, 5, 0),
    2: entry(2, 333.0, 5, 20),
    3: entry(3, 338.0, 5, 30),
    4: entry(4, 343.0, 5, 35),
    5: entry(5, 353.0, 6, 0),
  },
};

// ─── 7–9. CORRECTION PACKAGES ─────────────────────────────────────────────
export const correctionDeluxe: PackageData = {
  id: "correction-deluxe",
  naam: "Deluxe Correction Package",
  level: "deluxe",
  categorie: "correction",
  beschrijving:
    "Professionele éénstaps lakcorrectie. Verwijdert swirl marks, lichte krassen en matte lak.",
  inbegrepen: [
    "Uitgebreide voorbereiding & decontaminatie",
    "Éénstaps machine polijsten",
    "Swirl mark verwijdering",
    "Lichte krasverwijdering",
    "IPA wipe-down",
    "Finish sealant applicatie",
  ],
  aanbevolen: "correction-premium",
  prijzen: {
    1: entry(1, 449.95, 6, 30),
    2: entry(2, 449.95, 7, 0),
    3: entry(3, 599.95, 7, 0),
    4: entry(4, 699.95, 8, 0),
    5: entry(5, 799.95, 9, 0),
  },
};

export const correctionPremium: PackageData = {
  id: "correction-premium",
  naam: "Premium Correction Package",
  level: "premium",
  categorie: "correction",
  beschrijving:
    "Tweestaps lakcorrectie voor diepe krassen en zware oxidatie. Showroom­kwaliteit resultaat.",
  inbegrepen: [
    "Alles uit Deluxe Correction",
    "Tweestaps machine polijsten",
    "Diepe krasverwijdering",
    "Oxidatie behandeling",
    "Eindcontrole onder professionele verlichting",
    "Premium sealant of wax finish",
  ],
  aanbevolen: "correction-signature",
  badge: "Aanbevolen",
  highlight: true,
  prijzen: {
    1: entry(1, 549.95, 7, 30),
    2: entry(2, 599.95, 7, 50),
    3: entry(3, 699.95, 8, 10),
    4: entry(4, 799.95, 8, 30),
    5: entry(5, 899.95, 8, 50),
  },
};

export const correctionSignature: PackageData = {
  id: "correction-signature",
  naam: "Signature Correction Package",
  level: "signature",
  categorie: "correction",
  beschrijving:
    "Ons absolute topniveau. Driestaps lakcorrectie gecombineerd met keramische coating voor perfecte bescherming.",
  inbegrepen: [
    "Alles uit Premium Correction",
    "Driestaps machine polijsten",
    "Paint thickness meting",
    "Volledig documentatierapport",
    "Keramische coating inbegrepen",
    "2 jaar garantie",
    "Persoonlijk detailing rapport",
  ],
  badge: "Signature",
  prijzen: {
    1: entry(1, 749.95, 9, 30),
    2: entry(2, 849.95, 10, 0),
    3: entry(3, 949.95, 10, 30),
    4: entry(4, 1094.95, 11, 30),
    5: entry(5, 1249.95, 12, 30),
  },
};

// ─── KERAMISCHE COATING (geen aparte prijzen in PDF — aanvraag) ────────────
export const keramischeCoating: PackageData = {
  id: "coating",
  naam: "Keramische Coating",
  level: "premium",
  categorie: "coating",
  beschrijving:
    "De ultieme lakbescherming. Hydrofobe eigenschappen, UV-bescherming en een glasachtige glans voor 2–5 jaar. Altijd voorafgegaan door lakcorrectie.",
  inbegrepen: [
    "Lakcorrectie vooraf inbegrepen",
    "Professionele coating applicatie",
    "Hydrofobe nano-coating",
    "UV-bescherming",
    "2–5 jaar bescherming",
    "Certificaat & garantie",
    "Onderhoudsadvies",
  ],
  badge: "Exclusief",
  prijzen: {
    1: entry(1, 0, 0, 0),
    2: entry(2, 0, 0, 0),
    3: entry(3, 0, 0, 0),
    4: entry(4, 0, 0, 0),
    5: entry(5, 0, 0, 0),
  },
};

// ─── EXPORTS ──────────────────────────────────────────────────────────────
export const allPackages: PackageData[] = [
  interieurStandaard,
  interieurDeluxe,
  interieurPremium,
  exterieurStandaard,
  exterieurDeluxe,
  exterieurPremium,
  combiStandaard,
  combiDeluxe,
  combiPremium,
  correctionDeluxe,
  correctionPremium,
  correctionSignature,
  keramischeCoating,
];

export const packagesByCategory: Record<Category, PackageData[]> = {
  interieur: [interieurStandaard, interieurDeluxe, interieurPremium],
  exterieur: [exterieurStandaard, exterieurDeluxe, exterieurPremium],
  combi: [combiStandaard, combiDeluxe, combiPremium],
  correction: [correctionDeluxe, correctionPremium, correctionSignature],
  coating: [keramischeCoating],
};

export function getPackage(id: string): PackageData | undefined {
  return allPackages.find((p) => p.id === id);
}

export function getPrijs(pkg: PackageData, klasse: VehicleClass): PricingEntry {
  return pkg.prijzen[klasse];
}

export function formatPrijs(prijs: number): string {
  if (prijs === 0) return "Op aanvraag";
  return `€ ${prijs.toFixed(2).replace(".", ",")}`;
}

export const levelLabels: Record<string, string> = {
  standaard: "Standaard",
  deluxe: "Deluxe",
  premium: "Premium",
  signature: "Signature",
};

export const levelOrder = ["standaard", "deluxe", "premium", "signature"];

export const categoryMeta: Record<
  Category,
  { title: string; slug: string; beschrijving: string; icon: string }
> = {
  interieur: {
    title: "Interieur Detailing",
    slug: "interieur",
    beschrijving: "Van vacuüm tot diepreiniging — uw interieur stralend schoon.",
    icon: "🪑",
  },
  exterieur: {
    title: "Exterieur Detailing",
    slug: "exterieur",
    beschrijving: "Handwas, clay bar, sealant en meer voor een perfecte lak.",
    icon: "✨",
  },
  combi: {
    title: "Combi Pakketten",
    slug: "combi",
    beschrijving: "Het complete plaatje: interieur én exterieur in één dag.",
    icon: "🚗",
  },
  correction: {
    title: "Lakcorrectie",
    slug: "lakcorrectie",
    beschrijving: "Krassen, swirl marks en oxidatie — wij corrigeren het.",
    icon: "🔧",
  },
  coating: {
    title: "Keramische Coating",
    slug: "coating",
    beschrijving: "Jarenlange hydrofobe lakbescherming op professioneel niveau.",
    icon: "💎",
  },
};
