import Image from "next/image";

type BenefitCardProps = {
  tag: string;
  description: string;
  thumbnail: string;
};

export function BenefitCard({ tag, description, thumbnail }: BenefitCardProps) {
  return (
    <div className="group relative h-[365px] w-full overflow-hidden rounded-xl bg-gray-400">
      <div className="relative h-full w-full overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-110">
        <Image
          fill
          src={thumbnail}
          alt={tag}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="absolute inset-0 rounded-xl bg-black opacity-50"></div>
      <div className="absolute left-2 top-3 rounded-full bg-white/30 px-2 py-1 text-white">
        <p className="px-2 py-1 text-xs font-medium">{tag}</p>
      </div>
      <div className="absolute bottom-0 w-full text-secondary-foreground">
        <p className="px-3 py-8 text-xl font-semibold leading-[24px] tracking-[-0.8px] text-white">
          {description}
        </p>
      </div>
    </div>
  );
}
