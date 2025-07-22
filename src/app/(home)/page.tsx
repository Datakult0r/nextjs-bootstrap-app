import { HeroV2 } from "./_components/hero-v2";
import { AiPioneersSection } from "./_components/ai-pioneers-section";
import { IndustryFocusSection } from "./_components/industry-focus-section";
import { OurPartners } from "./_components/our-partners";
import { VideoIntroduction } from "./_components/video-introduction";
import { AIProgressTracker } from "./_components/ai-progress-tracker";
import { AISolutionsGamified } from "./_components/ai-solutions-gamified";
import { Quote } from "./_components/quote";
import { GetStartedSection } from "./_components/get-started-section";

import content from "./_data";

export default function Home() {
  // Add gamification stats to solutions
  const gamifiedSolutions = content.solutionOffering.solutions.map((solution, index) => ({
    ...solution,
    stats: {
      completion: [75, 60, 85, 45][index] ?? 0,
      users: ["2.5K+", "1.8K+", "3.2K+", "950+"][index] ?? "0",
      difficulty: ["Intermediate", "Beginner", "Advanced", "Beginner"][index] as "Beginner" | "Intermediate" | "Advanced"
    },
    features: [
      ["24/7 AI assistance", "Multi-language support", "Custom knowledge base", "Real-time responses"],
      ["Workflow analysis", "Process automation", "Integration support", "Performance tracking"],
      ["Full chain analysis", "ROI assessment", "Risk evaluation", "Strategic planning"],
      ["Expert guidance", "Custom training", "Best practices", "Implementation support"]
    ][index]
  }));

  return (
    <>
      <HeroV2 {...content.hero} />
      <AiPioneersSection {...content.aiPioneersSection} />
      <VideoIntroduction {...content.videoIntro} />
      <IndustryFocusSection {...content.industryFocus} />
      <OurPartners {...content.ourPartners} />
      <AISolutionsGamified 
        title={content.solutionOffering.title}
        heading={content.solutionOffering.heading}
        solutions={gamifiedSolutions}
      />
      <AIProgressTracker />
      <Quote {...content.quote} />
      <GetStartedSection {...content.mainCta} />
    </>
  );
}
