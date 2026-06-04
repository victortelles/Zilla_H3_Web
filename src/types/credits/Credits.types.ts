export interface SocialLink {
  platform: "github" | "twitter" | "telegram" | "vrchat" | "discord" | "linkedin" | "website";
  url: string;
  label: string;
}

export interface AuthorProfile {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  details: string[];
  socials: SocialLink[];
}

export interface AssetSpec {
  name: string;
  category: "typography" | "media" | "library" | "icon";
  description: string;
  exampleText?: string;
  techBadge?: string;
  link?: string;
}
