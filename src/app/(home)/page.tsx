import { HeroV2 } from "./_components/hero-v2";
import { OurPartners } from "./_components/our-partners";
import { VideoIntroduction } from "./_components/video-introduction";
import { AIProgressTracker } from "./_components/ai-progress-tracker";
import { AISolutionsGamified } from "./_components/ai-solutions-gamified";
import { AILearningPaths } from "./_components/ai-learning-paths";
import { Quote } from "./_components/quote";
import { Industries } from "./_components/industries";
import { Insight } from "./_components/insight";
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
      <VideoIntroduction {...content.videoIntro} />
      <OurPartners {...content.ourPartners} />
      <AIProgressTracker />
      <AISolutionsGamified 
        title={content.solutionOffering.title}
        heading={content.solutionOffering.heading}
        solutions={gamifiedSolutions}
      />
      <AILearningPaths />
      <Quote {...content.quote} />
      <Industries {...content.industries} />
      <Insight {...content.insights} />
      <GetStartedSection {...content.mainCta} />
    </>
  );
}
