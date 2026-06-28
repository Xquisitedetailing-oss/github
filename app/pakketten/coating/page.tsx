import { Metadata } from "next";
import Nav from "../../components/Nav";
import CategoryPageLayout from "../../components/CategoryPageLayout";
import { packagesByCategory } from "../../data/pricing";

export const metadata: Metadata = {
  title: "Keramische Coating | X-quisite Car Detailing",
  description:
    "Professionele keramische coating voor jarenlange hydrofobe lakbescherming. Altijd voorafgegaan door lakcorrectie. Prijs op aanvraag.",
};

export default function CoatingPage() {
  return (
    <>
      <Nav />
      <CategoryPageLayout
        title="Keramische Coating"
        icon="💎"
        beschrijving="De ultieme bescherming voor uw lak. Nano-keramische coating biedt hydrofobe eigenschappen, UV-bescherming en een glasachtige glans voor meerdere jaren. Altijd gecombineerd met professionele lakcorrectie vooraf."
        packages={packagesByCategory.coating}
      />
    </>
  );
}
