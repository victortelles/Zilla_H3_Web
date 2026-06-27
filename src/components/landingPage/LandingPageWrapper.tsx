/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Preloader from "./Preloader";
import Navbar from "../ui/navbar/Navbar";
import Hero from "./Hero";
import About from "./About";
import Service from "./Service";
import Gallery from "./Gallery";
import Footer from "../ui/footer/Footer";

export default function LandingPageWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const lastShown = localStorage.getItem("zilla_preloader_last_shown");
      if (lastShown) {
        const timePassed = Date.now() - parseInt(lastShown, 10);
        const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;
        if (timePassed < TWO_HOURS_IN_MS) {
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.error("Failed to read preloader storage status:", e);
    }
  }, []);

  const handlePreloaderComplete = () => {
    try {
      localStorage.setItem("zilla_preloader_last_shown", Date.now().toString());
    } catch (e) {
      console.error("Failed to write preloader storage status:", e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Service />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
