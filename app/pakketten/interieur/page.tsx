import { Metadata } from "next";
import Nav from "../../components/Nav";
import CategoryPageLayout from "../../components/CategoryPageLayout";
import { packagesByCategory } from "../../data/pricing";

export const metadata: Metadata = {
  title: "Interieur Detailing Pakketten | X-quisite Car Detailing",
  description:
    "Standaard, Deluxe en Premium interieur detailing voor alle voertuigklassen. Bekijk prijzen en boek direct.",
};

export default function InterieurPage() {
  return (
    <>
      <Nav />
      <CategoryPageLayout
        title="Interieur Detailing"
        icon="🪑"
        beschrijving="Van een grondige vacuümbeurt tot volledige extractie en lederbehandeling. Drie pakketten, vijf voertuigklassen — u kiest wat bij u past."
        packages={packagesByCategory.interieur}
      />
    </>
  );
}
