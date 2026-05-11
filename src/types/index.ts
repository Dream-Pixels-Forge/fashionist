export interface SectionProps {
  className?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface CollectionItem {
  title: string;
  season: string;
  image: string;
}

export interface LookCard {
  id: string;
  image: string;
  number: number;
  total: number;
}
