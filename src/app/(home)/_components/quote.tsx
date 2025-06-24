"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import config from "@/app/config";

interface QuoteSectionProps {
  quote: string;
  author: string;
  role: string;
  jobTitle: string;
  image: {
    src: string;
    alt: string;
  };
}

export function Quote(props: QuoteSectionProps) {
  return (
    <section className="bg-background pb-20 pt-10 font-sans md:px-6 lg:pb-[120px] lg:pt-20">
      <div className="container mx-auto w-full rounded-lg bg-navy p-4 text-navy-foreground">
        <div className="flex w-full flex-col-reverse gap-8 lg:flex-row">
          <figure className="relative h-[380px] w-full rounded-lg bg-muted lg:h-[460px] lg:w-[460px]">
            <div className="absolute left-4 top-4 z-10 rounded-full bg-mustard px-[16px] py-[8px]">
              <span className="font-mono uppercase text-mustard-foreground">
                {props.role}
              </span>
            </div>
            <Image
              fill
              src={props.image.src}
              alt={props.image.alt}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 460px"
              priority
              className="h-full w-full rounded-lg object-cover"
            />
          </figure>

          <article className="flex h-auto w-full flex-1 flex-col justify-between gap-y-20 pt-6 lg:gap-y-0 lg:p-6">
            <blockquote className="flex min-h-[200px] w-full flex-col space-y-4 lg:flex-1">
              <QuoteIcon />
              <p className="font-sans text-3xl font-light leading-[48px] -tracking-[1.4px]">
                {props.quote}
              </p>
            </blockquote>

            <footer className="flex items-end gap-x-10">
              <div className="space-y-2 font-sans text-base">
                <cite className="not-italic">{props.author}</cite>
                <p className="text-navy-foreground/40">{props.jobTitle}</p>
              </div>

              {/* <hr className="h-full w-[2px] bg-border" /> */}

              <div className="relative">
                <div className="absolute left-[45px] top-0 flex">
                  <span className="relative flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-700 opacity-75"></span>
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-green-700"></span>
                  </span>
                </div>

                <Button
                  className="rounded-full border-[3px] border-navy bg-green-500 py-8 transition-colors hover:bg-green-600"
                  onClick={() =>
                    window.open(config.whatsapp.link, "_blank")
                  }

                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </Button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg
      height={56}
      width={56}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
    </svg>
  );
}
