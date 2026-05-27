export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  icon: string; // ReactIcon name or similar
  href: string;
  label: string;
}

export interface FooterProps {
  className?: string;
}
