"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TitleBlock } from "@/components/common/title-block";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface ClientTestimonialSectionProps {
  title: string;
  heading: string;
  items: Array<{
    quote: string;
    name: string;
    title: string;
    company: string;
    image: string;
  }>;
}

export function ClientTestimonialSection(props: ClientTestimonialSectionProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      AutoPlay({
        delay: 5000,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ],
  );

  return (
    <section className="container overflow-hidden py-16">
      <div className="grid items-start gap-8 lg:grid-cols-[400px_1fr]">
        <div>
          <TitleBlock
            title={props.title}
            heading={props.heading}
            align="left"
          />
          <p className="leading-relaxed text-muted-foreground">
            Hear from our satisfied clients about their experiences.
          </p>
        </div>

        <Carousel
          ref={emblaRef}
          className="w-full overflow-hidden bg-background"
        >
          <CarouselContent className="-ml-4 animate-carousel">
            {props.items.map((testimonial, index) => (
              <CarouselItem
                key={`${testimonial.name}-${index}`}
                className="min-w-0 basis-full pl-4 md:basis-1/2"
              >
                <Card className="h-[420px] bg-secondary shadow-none">
                  <blockquote className="flex h-full flex-col justify-between p-8">
                    <p className="text-lg leading-relaxed tracking-tight">
                      {testimonial.quote}
                    </p>
                    <footer className="mt-6 flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.title} · {testimonial.company}
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
