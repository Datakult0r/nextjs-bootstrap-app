import { Rocket } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <section className="min-h-screen flex flex-col">
        <div className="flex flex-grow items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Rocket className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-4xl tracking-tighter">Coming Soon</h2>
        <p className="text-muted-foreground">
          {"We're"} working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </div>
    </section>
  );
}
