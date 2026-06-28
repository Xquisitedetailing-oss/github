import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import StatsBar from "./components/StatsBar";
import ServicesNew from "./components/ServicesNew";
import PricingConfigurator from "./components/PricingConfigurator";
import BeforeAfter from "./components/BeforeAfter";
import Process from "./components/Process";
import Reviews from "./components/Reviews";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <Manifesto />
      <ServicesNew />
      <BeforeAfter />
      <Process />
      <PricingConfigurator />
      <Reviews />
      <CTA />
      <Footer />
    </>
  );
}
