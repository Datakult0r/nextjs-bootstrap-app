import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { TitleBlock } from "@/components/common/title-block"

interface CTASectionProps {
  title: string;
  heading: string;
  paragraph: string;
  button: {
    label: string;
  },
  image: {
    src: string;
    alt: string;
  }
}

export function CTASection(props: CTASectionProps) {
  return (
    <section className="bg-primary text-primary-foreground px-4 md:px-8 lg:px-12">
      <div className="container py-14 lg:flex lg:items-start lg:justify-between lg:gap-12">
        {/* Logo */}
        <Link href="/" className="inline-block mb-24">


          {/* <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/676e163a2c163a5c1e036805_Riotters-Home-Page-Section-CTA-LvUc5l46aEyuS2SFqKc8TsLneGl58z.webp"
            alt="Logo"
            width={64}
            height={64}
            className="w-12 h-12"
          /> */}
        </Link>

        <div className="lg:max-w-2xl">
          <div className="max-w-3xl">
            <TitleBlock
              title={props.title}
              heading={props.heading}
              classNames={{
                container: "mb-4 max-w-4xl",
                title: "text-black/30",
              }}
              size="lg"
              align="left"
            />

            <p className="text-xl mb-8 leading-normal">
              {props.paragraph}
            </p>

            <Button
              asChild
              size="lg"
              className="rounded-full bg-black text-white hover:bg-black/90"
            >
              <Link href="#">{props.button.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
