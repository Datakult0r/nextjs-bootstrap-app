import { HeroSection } from "./_components/hero-section";
import { SectionA } from "./_components/section-a";
import { SectionB } from "./_components/section-b";
import { SectionC } from "./_components/section-c";
import { SectionD } from "./_components/section-d";
import { SectionE } from "./_components/section-e";
import { SectionF } from "./_components/section-f";

import data from "./_data";

export default function AILabsPage() {
  return (
    <>
      <HeroSection {...data.hero} />
      <SectionA {...data.sectionA} />
      <SectionF {...data.sectionF} />
      <SectionB {...data.sectionB} />
      <SectionD {...data.sectionD} />
      <SectionE {...data.sectionE} />
      <SectionC {...data.sectionC} />
    </>
  );
}
