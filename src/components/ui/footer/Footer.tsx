"use client";

import { FaTwitter, FaDiscord, FaTelegramPlane, FaVrCardboard } from "react-icons/fa";
import { FooterColumn, FooterSocial } from "@/types/ui/footer/Footer.types";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks: FooterSocial[] = [
    { icon: "telegram", href: "https://t.me/zilla_h3", label: "Telegram" },
    { icon: "twitter", href: "https://twitter.com/zilla_h3", label: "Twitter" },
    { icon: "vrchat", href: "https://vrchat.com/home/user/usr_zilla_h3", label: "VRChat" },
    { icon: "discord", href: "https://discord.gg/zilla_h3", label: "Discord" },
  ];

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "telegram":
        return <FaTelegramPlane className="h-5 w-5" />;
      case "twitter":
        return <FaTwitter className="h-5 w-5" />;
      case "vrchat":
        return <FaVrCardboard className="h-5 w-5" />;
      case "discord":
        return <FaDiscord className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const columns: FooterColumn[] = [
    {
      title: "Navigation",
      links: [
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Gallery", href: "#gallery" },
        { name: "All Projects", href: "/project" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Avatar Texturing", href: "#services" },
        { name: "Accessory Integration", href: "#services" },
        { name: "Clothing Adaptation", href: "#services" },
        { name: "Custom Commisions", href: "#about" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Info */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-black text-xl">
                Z
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                ZILLA<span className="font-light text-muted-foreground">_H3</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              Premium avatar creation and design services for the H3 ecosystem. Bring your virtual identity to life with high fidelity textures, garments, and interactions.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/40 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200"
                  aria-label={social.label}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold tracking-widest text-foreground/80 uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Zilla_H3. All rights reserved. Created for VRChat & H3 Ecosystem creators.
          </p>
          <div className="flex space-x-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
