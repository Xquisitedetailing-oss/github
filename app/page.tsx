import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PricingConfigurator from "./components/PricingConfigurator";
import TreatmentFinder from "./components/TreatmentFinder";
import BeforeAfter from "./components/BeforeAfter";
import Process from "./components/Process";
import Reviews from "./components/Reviews";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <PricingConfigurator />
      <TreatmentFinder />
      <BeforeAfter />
      <Process />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  );
}
