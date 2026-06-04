"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTelegramPlane, FaCheckCircle, FaStar, FaPaintBrush } from "react-icons/fa";
import { SiBlender, SiVrchat } from "react-icons/si";
import Button from "../ui/button/Button";
import StatusBadge from "../ui/statusBadge/StatusBadge";
import { configService } from "@/services/configService";
import { CommissionStatus } from "@/types/ui/statusBadge/StatusBadge.types";
import { FaUserPen } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [commissionStatus, setCommissionStatus] = useState<CommissionStatus>("available");
  const telegramUrl = configService.getContactTelegram();

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.commissionStatus) {
          setCommissionStatus(data.commissionStatus as CommissionStatus);
        }
      })
      .catch((err) => console.error("Failed to load commission status dynamically:", err));
  }, []);

  useGSAP(() => {
    // Scroll triggered animations
    gsap.from(".about-animate-left", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
    });

    gsap.from(".about-animate-right", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Orbit rotation around profile image
    gsap.to(".avatar-orbit", {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "linear",
    });

  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-card border-b border-border overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[10%] w-[350px] h-[350px] rounded-full bg-secondary/5 dark:bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* Left Side: Copywriting */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="about-animate-left inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <FaUserPen className="w-3.5 h-3.5" /> Hi!, I'm Zilla-ZH3
          </div>

          <h2 className="about-animate-left text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Bringing Avatars to Life <br />
            With Custom Textures & Style
          </h2>

          <p className="about-animate-left text-muted-foreground leading-relaxed text-base sm:text-lg">
            I'm an avatar creator, or avatar modifier, I actually have some experience to do a little of everything, but I'm specialized to texturing avatars!
          </p>

          {/* Checklist */}
          <div className="about-animate-left grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              "Optimized avatars",
              "Rigging clothing",
              "PhysBones config",
              "Unity w/ Prefab",
              "Accessories",
              "Advanced texturing",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                <FaCheckCircle className="text-primary h-4.5 w-4.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="about-animate-left pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open(telegramUrl, "_blank")}
              className="gap-2"
            >
              <FaTelegramPlane className="w-4 h-4" /> Message me on Telegram
            </Button>
          </div>
        </div>

        {/* Right Side: Creator Image Box & Commission Status */}
        <div className="about-animate-right lg:col-span-5 flex flex-col items-center">

          {/* Creator Profile Representation Card */}
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-border bg-background p-4 shadow-lg transition-transform duration-300 hover:scale-[1.01]">

            {/* Image Container with Orbiting rings */}
            <div className="relative aspect-square w-full flex items-center justify-center mb-5 group">
              {/* Soft glow in background */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-primary/10 blur-xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

              {/* Orbiting Ring with Tech Icons */}
              <div className="avatar-orbit absolute w-[94%] h-[94%] border border-dashed border-foreground/15 rounded-full pointer-events-none flex items-center justify-center">
                {/* Blender Icon */}
                <div className="absolute top-[-14px] flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border shadow-sm text-[#ea7600]">
                  <SiBlender className="w-4 h-4" />
                </div>
                {/* Adobe Icon */}
                <div className="absolute bottom-[-14px] flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border shadow-sm text-[#ff0000]">
                  <img src="./ASub3D.svg" alt="Adobe Icon" className="w-3.5 h-3.5" />
                </div>
                {/* VRChat Icon */}
                <div className="absolute left-[-14px] flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border shadow-sm text-[#1fd1ec]">
                  <SiVrchat className="w-4.5 h-4.5" />
                </div>
                {/* Paint Brush Icon */}
                <div className="absolute right-[-14px] flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border shadow-sm text-primary">
                  <FaPaintBrush className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Central Profile Image Wrapper */}
              <div className="relative w-[80%] h-[80%] rounded-2xl overflow-hidden border border-border/80 bg-card shadow-inner z-10">
                {/* Backglow mesh */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-secondary/5 to-transparent opacity-60 group-hover:scale-105 transition-transform duration-700" />

                {/* Overlay elements */}
                <div className="absolute top-4 left-4 p-2 rounded-xl bg-background/80 backdrop-blur-md border border-border/60 flex items-center gap-1.5 text-xs font-bold text-foreground z-20">
                  <FaStar className="text-amber-500" /> Lead Artist
                </div>

                {/* Creator profile image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/resources/profile/profile.png"
                  alt="Zilla_H3 Creator Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="w-full border-border/50 mt-2 mb-5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-2.5 text-center">
                Skills & Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border transition-colors hover:bg-muted/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fd1ec]" />
                  VRChat SDK3
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border transition-colors hover:bg-muted/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  PC & Quest Ready
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 transition-colors hover:bg-primary/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000]" />
                  Substance 3D
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 transition-colors hover:bg-primary/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea7600]" />
                  Blender
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 transition-colors hover:bg-primary/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Unity
                </span>
              </div>
            </div>

            {/* Availability Container underneath */}
            <div className="w-full bg-card/60 border border-border/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Availability State
                </span>
                <span className="text-sm font-display font-bold text-foreground mt-0.5">
                  Commission Status
                </span>
              </div>
              <StatusBadge status={commissionStatus} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
