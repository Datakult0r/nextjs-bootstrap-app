interface FeatureCardProps {
  content: {
    label: string;
    description: string;
  };
}

export function FeatureCard({ content }: FeatureCardProps) {
  const { label, description } = content;

  return (
    <div className="flex flex-col justify-between p-3 lg:p-8 h-[320px]">
      <h3 className="font-mono uppercase">{label}</h3>
      <p className="text-secondary-foreground text-2xl tracking-tighter">{description}</p>
    </div>
  );
}
