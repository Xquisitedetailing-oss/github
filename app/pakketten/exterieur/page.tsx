import { Metadata } from "next";
import Nav from "../../components/Nav";
import CategoryPageLayout from "../../components/CategoryPageLayout";
import { packagesByCategory } from "../../data/pricing";

export const metadata: Metadata = {
  title: "Exterieur Detailing Pakketten | X-quisite Car Detailing",
  description:
    "Standaard, Deluxe en Premium exterieur detailing voor alle voertuigklassen. Professionele handwas, clay bar en wax bescherming.",
};

export default function ExterieurPage() {
  return (
    <>
      <Nav />
      <CategoryPageLayout
        title="Exterieur Detailing"
        icon="✨"
        beschrijving="Handwas, decontaminatie, clay bar, sealant en wax. Uw lak in perfecte staat — van buiten stralend alsof de auto net van de showroom rolt."
        packages={packagesByCategory.exterieur}
      />
    </>
  );
}
