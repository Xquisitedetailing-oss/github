import { Metadata } from "next";
import Nav from "../../components/Nav";
import CategoryPageLayout from "../../components/CategoryPageLayout";
import { packagesByCategory } from "../../data/pricing";

export const metadata: Metadata = {
  title: "Lakcorrectie Pakketten | X-quisite Car Detailing",
  description:
    "Deluxe, Premium en Signature lakcorrectie. Krassen, swirl marks en oxidatie professioneel verwijderd. Bekijk prijzen per voertuigklasse.",
};

export default function LakcorrectiePage() {
  return (
    <>
      <Nav />
      <CategoryPageLayout
        title="Lakcorrectie"
        icon="🔧"
        beschrijving="Swirl marks, krassen en oxidatie horen tot het verleden. Onze lakcorrectie pakketten brengen uw lak terug naar showroomkwaliteit — met machinaal polijsten op professioneel niveau."
        packages={packagesByCategory.correction}
      />
    </>
  );
}
