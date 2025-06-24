import Image from "next/image";
type BenefitCardProps = {
  label: string;
  title: string;
  imgSrc: string;
};

export function BenefitCard(props: BenefitCardProps) {
  const { title, label, imgSrc } = props;

  return (
    <div className="space-y-3 rounded-xl border border-border p-2">
      <div className="relative h-[320px] w-full overflow-hidden rounded-xl">
        <Image 
          fill 
          src={imgSrc} 
          alt={`Illustration for ${title}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover" 
        />
        <div className="absolute inset-0 left-2 top-2 flex h-fit w-fit items-center justify-center rounded-xl bg-black/50 px-3 py-2">
          <p className="font-mono text-sm uppercase text-foreground">{label}</p>
        </div>
      </div>

      <h3 className="px-4 pb-4 text-2xl leading-8 tracking-[-1.2px]">
        {title}
      </h3>
    </div>
  );
}
