"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaChevronLeft, FaCheck, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";
import Button from "@/components/ui/button/Button";
import { tosMetadata, tosSections } from "./TermsConditionData";

gsap.registerPlugin(useGSAP);

export default function TermsCondition() {
  const router = useRouter();
  const [activeId, setActiveId] = useState("");

  // Staggered entrance animation using GSAP
  useGSAP(() => {
    gsap.fromTo(
      ".tos-animate-header",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }
    );

    gsap.fromTo(
      ".tos-section-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.15
      }
    );
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by their distance from the top of viewport to be accurate
          const topmost = visibleEntries.reduce((prev, curr) => {
            return prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr;
          });
          setActiveId(topmost.target.id);
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px", // Trigger when section occupies the active middle portion
        threshold: 0.05
      }
    );

    tosSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Adjust to prevent navbar overlaps
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

        {/* Navigation & Header */}
        <div className="space-y-6 text-left relative z-10 tos-animate-header">
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
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
              {tosMetadata.subtitle}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-foreground uppercase font-display">
              {tosMetadata.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-muted text-muted-foreground border border-border">
                {tosMetadata.lastUpdated}
              </span>
            </div>
          </div>

          {/* Agreement disclaimer box */}
          <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 text-base sm:text-lg leading-relaxed w-full text-foreground/90 font-body relative overflow-hidden backdrop-blur-sm shadow-2xs">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            <p className="pl-2">{tosMetadata.agreementNote}</p>
          </div>
        </div>

        {/* Layout Structure */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12 items-start relative z-10">
          
          {/* Sidebar - Table of Contents (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 font-sans pl-2">
              Table of Contents
            </h2>
            <nav className="space-y-1.5">
              {tosSections.map((section) => {
                const isActive = activeId === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleTocClick(e, section.id)}
                    className={`group flex items-center py-2.5 px-3 text-sm sm:text-base font-bold rounded-lg transition-all duration-200 border-l-2 ${
                      isActive
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <span className="truncate">{section.title}</span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Content Sections */}
          <div className="lg:col-span-3 space-y-12">
            {tosSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="tos-section-card p-6 md:p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/25 transition-all duration-300 space-y-4 scroll-mt-24"
              >
                <h2 className="text-xl sm:text-2xl font-black uppercase text-foreground font-display tracking-tight border-b border-border pb-3">
                  {section.title}
                </h2>

                {section.paragraphs &&
                  section.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-base sm:text-lg text-foreground/80 leading-relaxed font-body">
                      {p}
                    </p>
                  ))}

                {/* List Groups */}
                {section.listGroups &&
                  section.listGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-3 mt-4">
                      {group.title && (
                        <h3 className="text-base font-bold tracking-wider text-foreground/80 uppercase font-sans">
                          {group.title}
                        </h3>
                      )}
                      <ul className="space-y-2.5">
                        {group.items.map((item, iIdx) => {
                          if (group.type === "checked") {
                            return (
                              <li key={iIdx} className="flex items-start gap-2.5 text-base sm:text-lg text-foreground/90 font-body">
                                <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-success/15 text-success">
                                  <FaCheck className="w-2.5 h-2.5" />
                                </span>
                                <span>{item}</span>
                              </li>
                            );
                          }
                          if (group.type === "crossed") {
                            return (
                              <li key={iIdx} className="flex items-start gap-2.5 text-base sm:text-lg text-foreground/90 font-body">
                                <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-destructive/15 text-destructive">
                                  <FaTimes className="w-2.5 h-2.5" />
                                </span>
                                <span>{item}</span>
                              </li>
                            );
                          }
                          if (group.type === "numbered") {
                            return (
                              <li key={iIdx} className="flex items-start gap-3.5 text-base sm:text-lg text-foreground/90 font-body pl-1">
                                <span className="flex-shrink-0 mt-0.5 font-mono text-xs font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                                  {iIdx + 1}
                                </span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            );
                          }
                          // Bullet
                          return (
                            <li key={iIdx} className="flex items-start gap-2.5 text-base sm:text-lg text-foreground/90 font-body pl-2">
                              <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}

                {/* Refund Table Data */}
                {section.tableData && (
                  <div className="mt-6 overflow-hidden rounded-xl border border-border shadow-2xs">
                    <table className="w-full text-left border-collapse bg-card/45 backdrop-blur-xs">
                      <thead>
                        <tr className="border-b border-border bg-muted/40">
                          {section.tableData.headers.map((header, hIdx) => (
                            <th
                              key={hIdx}
                              className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-foreground/80 font-sans"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {section.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-muted/20 transition-colors duration-150">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 text-base text-foreground/90 font-body font-medium">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.paragraphsAfter &&
                  section.paragraphsAfter.map((p, idx) => (
                    <p key={idx} className="text-base sm:text-lg text-foreground/80 leading-relaxed font-body mt-4">
                      {p}
                    </p>
                  ))}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
