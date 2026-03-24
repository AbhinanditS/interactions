import { Metadata } from "next";
import { HorizontalSlideScrollExperience } from "../Prototype";

export const metadata: Metadata = {
  title: "Horizontal Slide Scroll — Full Page",
  description: "Immersive full-page view for the horizontal slide scroll prototype.",
};

export default function HorizontalSlideScrollFullPage() {
  return <HorizontalSlideScrollExperience showChrome={false} />;
}
