interface CompanyMissionSectionProps {
  heading: string;
  paragraph: string;
  values: {
    id: string;
    name: string;
  }[];
}

export function CompanyMissionSection(props: CompanyMissionSectionProps) {
  return (
    <section className="relative w-full  border-b border-border  overflow-hidden bg-background px-6 py-12 md:px-12 lg:px-24">
      {/* Content container */}
      <div className="container border-x border-border  relative grid w-full grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Logo */}
        <div className="mb-16 lg:col-span-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-8 w-8"
          >
            <path d="M2 20L12 4L22 20H2Z" />
          </svg>
        </div>

        <div className="space-y-10 lg:col-span-8">
          <div className="mb-16 max-w-3xl space-y-12">
            <p className="text-3xl tracking-tighter md:text-4xl">
              {props.heading}
            </p>
            <p className="text-3xl tracking-tighter md:text-4xl">
              {props.paragraph}
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            {props.values.map((value, index) => (
              <div key={value.id} className="border-t border-border font-mono pt-4">
                <span className="text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-sm">{value.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
