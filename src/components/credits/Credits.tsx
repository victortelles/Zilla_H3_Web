"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaGithub,
  FaTelegramPlane,
  FaVrCardboard,
  FaDiscord,
  FaGlobe,
  FaPaintBrush,
  FaCode,
  FaFont,
  FaGamepad,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiGreensock,
  SiBlender,
} from "react-icons/si";

import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";
import Button from "@/components/ui/button/Button";
import { configService } from "@/services/configService";
import { AuthorProfile, AssetSpec } from "@/types/credits/Credits.types";

import "@/styles/chibi.css";

gsap.registerPlugin(useGSAP);

export default function Credits() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Load social URLs from the config service
  const zillaSocials = [
    { platform: "telegram" as const, url: configService.getContactTelegram() || "https://t.me/Zilla_H3", label: "Telegram" },
    { platform: "twitter" as const, url: configService.getTwitterProfile() || "https://x.com/Zilla_H3", label: "Twitter" },
    { platform: "vrchat" as const, url: configService.getVRChatProfile() || "https://vrchat.com/home/user/usr_zilla", label: "VRChat" },
    { platform: "discord" as const, url: configService.getContactDiscord() || "https://discord.gg/zilla", label: "Discord" },
  ];

  const devSocials = [
    { platform: "github" as const, url: "https://github.com/victortelles", label: "GitHub" },
    { platform: "website" as const, url: "https://www.victortelles.dev/", label: "Portfolio" },
  ];

  const authors: AuthorProfile[] = [
    {
      name: "Zilla_H3",
      role: "Lead 3D Artist & Avatar Creator",
      avatarUrl: "/resources/profile/profile.png",
      bio: "An accomplished avatar creator and customizer. Specialized in creating high-quality, fully optimized VRChat avatars, advanced 3D texturing, physics setups, clothing rigging, and accessory integrations.",
      details: [
        "Substance 3D Painter & Photoshop Texturing",
        "Unity Avatar Optimization & Prefab Configuration",
        "Blender modeling, mesh editing, and clothing rigging",
        "VRChat SDK3, PhysBones, and expression setup"
      ],
      socials: zillaSocials,
    },
    {
      name: "AHTyler",
      role: "Full-Stack Web Developer",
      avatarUrl: "/resources/profile/tyler.jpg",
      bio: "A full-stack software engineer focused on building premium web experiences. Developed the Zilla_H3 portfolio, implementing responsive layouts, Discord OAuth whitelist authentication, admin dashboard, and modern scroll interactions.",
      details: [
        "Next.js App Router (React 19) & TypeScript architecture",
        "Tailwind CSS v4 & custom design theme system",
        "GSAP scroll triggers & Framer Motion micro-interactions",
        "Discord OAuth & secure state management integration"
      ],
      socials: devSocials,
    },
  ];

  const chibis = [
    { name: "Zillon", src: "/resources/chibis/zillon.gif" },
    { name: "Darrell", src: "/resources/chibis/darrell.gif" },
    { name: "Tyler", src: "/resources/chibis/tyler.gif" },
    { name: "8Bits", src: "/resources/chibis/8bits.gif" },
    { name: "Jocho", src: "/resources/chibis/jocho.gif" },
  ];

  const technologies = [
    {
      name: "Next.js 16",
      icon: <SiNextdotjs className="w-8 h-8 text-foreground" />,
      description: "React 19 framework providing optimal rendering, routing, and metadata configurations.",
    },
    {
      name: "Tailwind CSS v4",
      icon: <SiTailwindcss className="w-8 h-8 text-[#38bdf8]" />,
      description: "Utility-first CSS styling leveraging modern custom CSS variables and theme configurations.",
    },
    {
      name: "GSAP (GreenSock)",
      icon: <SiGreensock className="w-8 h-8 text-[#88ce02]" />,
      description: "High-performance animations for scroll triggers, entering timelines, and parallax components.",
    },
    {
      name: "Framer Motion",
      icon: <SiFramer className="w-8 h-8 text-[#ff00a0]" />,
      description: "React motion library powering button clicks, card hovers, and small spring transitions.",
    },
    {
      name: "Substance 3D Painter",
      icon: <img src="/ASub3D.svg" alt="Substance 3D" className="w-8 h-8 object-contain" />,
      description: "Industry-standard PBR texturing tool used for creating highly detailed avatar textures.",
    },
    {
      name: "Blender 3D",
      icon: <SiBlender className="w-8 h-8 text-[#e07300]" />,
      description: "Open-source 3D suite used for clothing adaptation, rigging, and mesh optimizations.",
    },
  ];

  const fonts: AssetSpec[] = [
    {
      name: "Evolve Sans EVO",
      category: "typography",
      description: "Display font used for bold titles, page headings, and brand logos to define our premium aesthetic.",
      exampleText: "ABCDEFGHIJKLM NOPQRSTUVWXYZ 1234567890",
      techBadge: "font-display font-black tracking-tight",
      link: "https://www.behance.net/gallery/63193095/MADE-Evolve-Sans-Font"
    },
    {
      name: "MADE Evolve Sans",
      category: "typography",
      description: "Standard body sans-serif font utilized for clean paragraphs, buttons, navigation links, and cards.",
      exampleText: "Bringing VRChat avatars to life with custom textures, rigging and style.",
      techBadge: "font-body text-sm leading-relaxed",
      link: "https://www.behance.net/gallery/63193095/MADE-Evolve-Sans-Font"
    },
    {
      name: "IBM Plex Mono",
      category: "typography",
      description: "Monospaced font designed for metadata labels, state badges, tech stacks, and command layouts.",
      exampleText: "const zillaConfig = { status: 'available' };",
      techBadge: "font-mono text-xs",
      link: "https://fonts.google.com/specimen/IBM+Plex+Mono"
    }
  ];

  // GSAP animations for entrance
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".credits-anim-header",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    tl.fromTo(
      ".credits-anim-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      ".credits-anim-section",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <FaGithub className="w-5 h-5" />;
      case "telegram":
        return <FaTelegramPlane className="w-5 h-5" />;
      case "twitter":
        return <FaXTwitter className="w-5 h-5" />;
      case "vrchat":
        return <FaVrCardboard className="w-5 h-5" />;
      case "discord":
        return <FaDiscord className="w-5 h-5" />;
      case "website":
        return <FaGlobe className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <main ref={containerRef} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        {/* Dynamic Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />

        {/* Ambient light source orbs */}
        <div className="absolute right-[-5%] top-[15%] w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl pointer-events-none z-0" />
        <div className="absolute left-[-5%] bottom-[15%] w-[400px] h-[400px] rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl pointer-events-none z-0" />

        {/* Header / Intro */}
        <div className="credits-anim-header space-y-6 text-left relative z-10 mb-16">
          <div>
            <Button
              variant="outline"
              size="md"
              onClick={() => router.push("/")}
              className="gap-2.5 text-sm font-bold font-body"
            >
              <FaChevronLeft className="w-3.5 h-3.5" /> Return Home
            </Button>
          </div>

          <div className="max-w-3xl">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
              PROJECT CREDITS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-foreground uppercase font-display">
              CREATORS & RESOURCES
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-body">
              This project is a collaborative effort bringing together high-end 3D character design and interactive, modern web experiences. Here is a breakdown of the team and elements that make up the Zilla_H3 website.
            </p>
          </div>
        </div>

        {/* Section 1: Authors Profiles */}
        <section className="relative z-10 mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-border/80 pb-4">
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FaPaintBrush className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-foreground font-display tracking-tight">
              Project Authors
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {authors.map((author, idx) => (
              <div
                key={author.name}
                className="credits-anim-card group relative p-6 sm:p-8 rounded-3xl border border-border bg-card/45 backdrop-blur-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                {/* Visual Accent Bar */}
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-primary to-accent rounded-r-lg group-hover:h-1/2 transition-all duration-300" />

                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Avatar with Tech Orbit styling */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden border border-border/80 bg-background p-1 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={author.avatarUrl}
                        alt={`${author.name} Avatar`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                      <h3 className="text-2xl font-black tracking-tight font-display text-foreground">
                        {author.name}
                      </h3>
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                        {author.role}
                      </p>
                      <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-2">
                        {idx === 0 ? (
                          <>
                            <span className="text-[10px] font-mono font-bold bg-[#ea7600]/10 text-[#ea7600] px-2 py-0.5 rounded border border-[#ea7600]/20">3D Rigging</span>
                            <span className="text-[10px] font-mono font-bold bg-success/10 text-success px-2 py-0.5 rounded border border-success/20">Texturing</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">Developer</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
                      {author.bio}
                    </p>

                    <div className="space-y-2 border-t border-border/50 pt-4">
                      <h4 className="text-xs font-mono font-bold uppercase text-foreground/80 tracking-wider">
                        Core Contributions:
                      </h4>
                      <ul className="space-y-2 pl-1">
                        {author.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85 font-body">
                            <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-border/50">
                  {author.socials.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-muted/60 border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                    >
                      {getSocialIcon(social.platform)}
                      <span>{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Chibis Showcase */}
        <section className="credits-anim-section relative z-10 mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-border/80 pb-4">
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FaGamepad className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-foreground font-display tracking-tight">
              Chibi Illustrations
            </h2>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-border bg-card/30 backdrop-blur-md relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-25 pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center mb-8 relative z-10">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
                The footer displays a series of bouncing chibi GIFs that represent custom avatars designed and customized by Zilla_H3. Hover over them to see their bouncing interactions!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 lg:gap-8 justify-items-center relative z-10">
              {chibis.map((chibi, index) => (
                <div
                  key={chibi.name}
                  className="animate-chibi-bounce flex flex-col items-center justify-center group relative p-4 rounded-2xl bg-background/50 border border-border/50 hover:border-primary/20 hover:bg-background/80 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.25}s` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center overflow-visible select-none">
                    <img
                      src={chibi.src}
                      alt={chibi.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-115 drop-shadow-[0_6px_8px_rgba(0,0,0,0.15)]"
                    />
                  </div>
                  <span className="mt-3 text-xs font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {chibi.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Chibi Artist Dedicated Mini-Card */}
            <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-display font-bold text-lg shrink-0">
                  <img src="/resources/profile/will.jpg" alt="Will_h2" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-bold text-foreground font-sans">Will_h2</h4>
                    <span className="text-[9px] font-mono font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">Illustrator</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    These chibis were created by Will_H2. Creative illustrator behind the custom character drawings.
                  </p>
                </div>
              </div>
              <motion.a
                href="https://x.com/WILL_H2_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-muted/80 border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
                <span>Follow Will_H2</span>
              </motion.a>
            </div>
          </div>
        </section>

        {/* Section 3: Typography Showcase */}
        <section className="credits-anim-section relative z-10 mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-border/80 pb-4">
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FaFont className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-foreground font-display tracking-tight">
              Design Typography
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fonts.map((font) => (
              <div
                key={font.name}
                className="p-6 rounded-3xl border border-border bg-card/45 backdrop-blur-md flex flex-col justify-between hover:border-primary/20 hover:shadow-xs transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-foreground font-sans">
                        {font.name}
                      </h3>
                      {font.link && (
                        <a
                          href={font.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors p-1 rounded hover:bg-muted/50 inline-flex items-center justify-center"
                          title="View Font Source"
                        >
                          <FaExternalLinkAlt className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                      {font.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                    {font.description}
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-background border border-border/50 overflow-hidden relative">
                  <div className="absolute right-3 top-3 text-[9px] font-mono text-muted-foreground select-none uppercase tracking-widest opacity-40">
                    Specimen
                  </div>
                  <div className={`${font.techBadge} text-foreground group-hover:text-primary transition-colors duration-300 break-words whitespace-pre-wrap`}>
                    {font.exampleText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Technologies & Libraries */}
        <section className="credits-anim-section relative z-10">
          <div className="flex items-center gap-3 mb-8 border-b border-border/80 pb-4">
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FaCode className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-foreground font-display tracking-tight">
              Tech Stack & Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="p-6 rounded-3xl border border-border bg-card/45 backdrop-blur-md flex items-start gap-4 hover:border-primary/20 hover:shadow-xs transition-all duration-300 group"
              >
                <div className="p-3 rounded-2xl bg-background border border-border group-hover:scale-105 group-hover:border-primary/25 transition-all duration-300 shrink-0">
                  {tech.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-foreground font-sans group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
