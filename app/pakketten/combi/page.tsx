import { Metadata } from "next";
import Nav from "../../components/Nav";
import CategoryPageLayout from "../../components/CategoryPageLayout";
import { packagesByCategory } from "../../data/pricing";

export const metadata: Metadata = {
  title: "Combi Detailing Pakketten | X-quisite Car Detailing",
  description:
    "Complete combi pakketten: interieur én exterieur in één behandeling. De meest gekozen keuze voor totaalverzorging.",
};

export default function CombiPage() {
  return (
    <>
      <Nav />
      <CategoryPageLayout
        title="Combi Pakketten"
        icon="🚗"
        beschrijving="Het complete plaatje. Interieur én exterieur in één behandeling — van binnen stralend en van buiten onberispelijk. Onze meest gekozen pakketten."
        packages={packagesByCategory.combi}
      />
    </>
  );
}
