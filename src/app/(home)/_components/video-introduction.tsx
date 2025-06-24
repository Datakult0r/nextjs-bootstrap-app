import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface VideoIntroductionProps {
  videosrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
}

export function VideoIntroduction(props: VideoIntroductionProps) {
  return (
    <div className="container relative py-16 md:py-10 lg:max-w-5xl">
      <HeroVideoDialog
        videosrc={props.videosrc}
        thumbnailSrc={props.thumbnailSrc}
        thumbnailAlt={props.thumbnailAlt}
        className="block aspect-video"
        animationStyle="top-in-bottom-out"

      />
    </div>
  );
}
