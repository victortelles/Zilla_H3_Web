"use client";

import { useState } from "react";
import Preloader from "./Preloader";
import Navbar from "../ui/navbar/Navbar";
import Hero from "./Hero";
import About from "./About";
import Service from "./Service";
import Gallery from "./Gallery";
import Footer from "../ui/footer/Footer";

export default function LandingPageWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Service />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
