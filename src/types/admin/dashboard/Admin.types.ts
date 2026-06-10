export interface Project {
  id: string;
  name: string;
  creator: string;
  polyCount: string;
  tags: string[];
  image: string;
  description: string;
  species: string;
  createdAt: string;
  externalLink?: string;
  featured?: boolean;
}
