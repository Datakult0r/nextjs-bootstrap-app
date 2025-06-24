import Link from "next/link";
import Image from "next/image";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

export interface InsightCardProps {
  heading: string;
  description: string;
  thumbnail: string;
  link: string;
}

export function InsightCard(props: InsightCardProps) {
  return (
    <Link href={props.link} target="_blank" className="block overflow-hidden">
      <div className="group relative w-full overflow-hidden rounded-lg border border-border bg-inherit text-inherit transition-all duration-300 ease-in-out hover:shadow-md">
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            fill
            alt={`Thumbnail for ${props.heading}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
            src={props.thumbnail}
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="space-y-3 p-4">
          <div className="text-base font-semibold capitalize sm:text-sm">
            {props.heading}
          </div>
          <div className="h-[48px] w-full overflow-hidden">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {props.description}
            </p>
          </div>
          <div className="translate-y-[150%] transform overflow-hidden transition-transform duration-300 ease-in-out group-hover:translate-y-0">
            <AnimatedArrowButton
              size="sm"
              variant="secondary"
              className="text-xs"
            >
              Read
            </AnimatedArrowButton>
          </div>
        </div>
      </div>
    </Link>
  );
}
