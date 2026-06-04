"use client";

import React from "react";
import {
  FaUserAlt,
  FaTshirt,
  FaPaintBrush,
  FaCrown,
  FaGamepad,
  FaStar
} from "react-icons/fa";

export default function PreloaderBackground() {
  const backgroundIcons = [
    { Icon: FaUserAlt, size: "text-2xl", top: "15%", left: "10%", delay: 0 },
    { Icon: FaTshirt, size: "text-4xl", top: "25%", left: "75%", delay: 0.5 },
    { Icon: FaPaintBrush, size: "text-3xl", top: "70%", left: "15%", delay: 0.2 },
    { Icon: FaCrown, size: "text-2xl", top: "80%", left: "80%", delay: 0.8 },
    { Icon: FaGamepad, size: "text-5xl", top: "10%", left: "85%", delay: 0.4 },
    { Icon: FaStar, size: "text-xl", top: "60%", left: "90%", delay: 0.6 },
    { Icon: FaStar, size: "text-3xl", top: "45%", left: "8%", delay: 0.3 },
    { Icon: FaUserAlt, size: "text-3xl", top: "85%", left: "45%", delay: 0.7 },
  ];

  return (
    <>
      {/* Background Sky Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundIcons.map(({ Icon, size, top, left, delay }, i) => (
          <div
            key={i}
            className="preloader-icon absolute text-primary-foreground/20"
            style={{ top, left, transitionDelay: `${delay}s` }}
          >
            <Icon className={`${size}`} />
          </div>
        ))}
      </div>

      {/* Floating Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Side Clouds */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/resources/cloud-01.png"
          alt="Cloud Left 1"
          className="preloader-cloud preloader-cloud-left absolute left-[-5%] top-[10%] w-[35%] max-w-[400px] object-contain select-none pointer-events-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/resources/cloud-03.png"
          alt="Cloud Left 2"
          className="preloader-cloud preloader-cloud-left absolute left-[-10%] bottom-[15%] w-[45%] max-w-[500px] object-contain select-none pointer-events-none"
        />

        {/* Right Side Clouds */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/resources/cloud-02.png"
          alt="Cloud Right 1"
          className="preloader-cloud preloader-cloud-right absolute right-[-5%] top-[15%] w-[40%] max-w-[450px] object-contain select-none pointer-events-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/resources/cloud-04.png"
          alt="Cloud Right 2"
          className="preloader-cloud preloader-cloud-right absolute right-[-8%] bottom-[20%] w-[38%] max-w-[400px] object-contain select-none pointer-events-none"
        />
      </div>
    </>
  );
}
