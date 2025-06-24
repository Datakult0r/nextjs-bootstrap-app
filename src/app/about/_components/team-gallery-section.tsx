import Image from "next/image";

// import { SectionHeader } from "@/components/common/section-header";

interface TeamGallerySectionProps {
  title: string;
  heading: string;
  paragraph: string;
  members: {
    name: string;
    role: string;
    image: {
      url: string;
      alt: string;
    };
    socialLink: string;
  }[];
}

export function TeamGallerySection(props: TeamGallerySectionProps) {
  return (
    <div className="container space-y-20 py-20">
      {/* <SectionHeader
        subtitle={props.title}
        title={props.heading}
        description={props.paragraph}
      /> */}

      <div className="container grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:px-0">
        {props.members.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}

export function TeamCard(props: TeamGallerySectionProps["members"][number]) {
  return (
    <div className="group flex w-full flex-col gap-y-4 rounded-2xl bg-background">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl">
        <Image
          src={props.image.url}
          alt={props.image.alt}
          fill
          className="rounded-2xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-semibold">{props.name}</h3>
        </div>
      </div>
    </div>
  );
}
