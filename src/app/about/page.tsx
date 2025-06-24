import { HeroSection } from "./_components/hero-section";
import { CompanyMissionSection } from "./_components/company-mission-section";
import { MotivationSection } from "./_components/motivation-section";
import { OfficeMapLocationSection } from "./_components/office-map-location-section";

import content from "./_data";

export default function About() {
  return (
    <>
      <HeroSection {...content.hero} />
      <CompanyMissionSection {...content.companyMission} />
      <MotivationSection {...content.motivation} />
      <OfficeMapLocationSection {...content.officeMapLocation} />
    </>
  );
}
