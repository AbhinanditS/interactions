export type PortfolioStatus =
  | "planned"
  | "in-progress"
  | "figma"
  | "wired"
  | "built"
  | "shipped";

export interface ContentLink {
  label: string;
  href: string;
}
