import { TitleBlock } from "@/components/common/title-block";

interface HeroSectionProps {
  title: string;
  heading: string;
  paragraph: string;
  videosrc: string;
}

export function HeroSection(props: HeroSectionProps) {
  return (
    <header className="border-b border-border lg:h-[620px]">
      <div className="grid h-[1200px] grid-cols-1 lg:h-full **lg:grid-cols-12 lg:grid-cols-1 container lg:px-0">
        <div className="relative flex items-center **lg:col-span-8 lg:border-r lg:border-border">
          <div className="absolute inset-0">
            <video
              src={props.videosrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-[#00000080]" />
          </div>

          <div className="relative mt-auto max-w-2xl space-y-3 px-6 pb-10 text-white lg:px-12">
            <TitleBlock size="xl" align="left" {...props} />
            <p className="text-xl">{props.paragraph}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
