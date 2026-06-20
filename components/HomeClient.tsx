"use client";
import { useState } from "react";
import CinematicIntro from "./CinematicIntro";
import RedLightLeak from "./RedLightLeak";
import Hero from "./sections/Hero";
import OurStory from "./sections/OurStory";
import OrderOfDay from "./sections/OrderOfDay";
import DressCode from "./sections/DressCode";
import Entourage from "./sections/Entourage";
import Sponsors from "./sections/Sponsors";
import Gallery from "./sections/Gallery";
import GiftMessage from "./sections/GiftMessage";
import RSVPSection from "./sections/RSVPSection";
import Footer from "./sections/Footer";

export default function HomeClient() {
  const [showSite, setShowSite] = useState(false);

  return (
    <>
      {!showSite && <CinematicIntro onComplete={() => setShowSite(true)} />}

      <div
        style={{
          opacity: showSite ? 1 : 0,
          transition: "opacity 1s ease",
          minHeight: "100vh",
        }}
      >
        <RedLightLeak />
        <main>
          <Hero />
          <OurStory />
          <OrderOfDay />
          <DressCode />
          <Entourage />
          <Sponsors />
          <Gallery />
          <GiftMessage />
          <RSVPSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
