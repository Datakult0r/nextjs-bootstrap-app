import { cn } from "@/libs/utils";
import Image from "next/image";
import { HoveringQuoteMark } from "@/components/ui/hovering-quote-mark";
import { type FC } from "react";

type TestimonialCardProps = {
  name: string;
  role?: string;      // For GHL usage
  title?: string;     // For AVA usage
  company?: string;   // For AVA usage
  content?: string;   // For GHL usage (the quote)
  quote?: string;     // For AVA usage (the quote)
  avatar?: string;    // For GHL usage
  image?: string;     // For AVA usage
  className?: string;
};

export const TestimonialCard: FC<TestimonialCardProps> = (props) => {
  const { 
    name, 
    role, 
    title, 
    company, 
    content, 
    quote, 
    avatar, 
    image,
    className 
  } = props;

  const displayQuote = content || quote;
  const displayRole = role || title;
  const displayImage = avatar || image;
  const displayCompany = company;

  return (
    <div className={cn("flex flex-col justify-between space-y-16 rounded-xl bg-secondary p-4 pb-6", className)}>
      <div className="relative size-[64px] overflow-hidden rounded-full bg-gray-300">
        {displayImage && (
          <Image
            fill
            className="rounded-full bg-gray-300 object-cover"
            src={displayImage}
            alt={`Avatar of ${name}`}
          />
        )}
      </div>

      <div className="relative space-y-5 px-4 pr-8">
        <HoveringQuoteMark className="size-8 text-primary" />
        <h5 className="text-2xl leading-[32px] tracking-[-1.2px]">{displayQuote}</h5>
      </div>

      <div className="flex gap-4">
        <div className="h-auto w-1 border-l-2 border-primary" />
        <div className="space-y-2">
          <p className="tracking-tight">{name}</p>
          <div className="flex flex-col space-y-1 font-mono text-xs uppercase text-secondary-foreground/50">
            <p>{displayRole}</p>
            {displayCompany && <p>{displayCompany}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}
