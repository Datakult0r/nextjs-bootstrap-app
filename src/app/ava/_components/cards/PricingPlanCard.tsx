"use client";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
// import { avaBookingSource } from "@/app/config";
// import { LeadForm } from "../common/lead-form";

export interface PricingPlanCardProps {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  description?: string;
}

export function PricingPlanCard(props: PricingPlanCardProps) {
  const { name, price, features, cta, highlighted, description } = props;

  return (
    <Card className={`w-full ${highlighted ? "border-2 border-inverse" : ""}`}>
      <CardHeader className="space-y-2 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg tracking-tight">{name}</h3>
          {highlighted && (
            <span className="rounded-full bg-orange-500 px-2 py-1 font-mono text-xs font-semibold uppercase text-white">
              Popular
            </span>
          )}
        </div>
        {description && <p className="text-sm text-black/50">{description}</p>}
      </CardHeader>

      <CardContent>
        <PriceDisplay price={price} />
        <div className="h-[1px] w-full border-b border-b-gray-200 py-3" />
        <FeatureList features={features} />
      </CardContent>

      <CardFooter>
        {/* <LeadForm
          source={avaBookingSource.bookingUrl}
          id={avaBookingSource.bookingId}
        >
        </LeadForm> */}
          <AnimatedArrowButton className="w-full">{cta}</AnimatedArrowButton>
      </CardFooter>
    </Card>
  );
}

function PriceDisplay({ price }: { price: string }) {
  return (
    <div className="flex items-baseline text-4xl tracking-tighter">
      {price}
      {price !== "Custom" && (
        <span className="ml-1 text-sm font-normal tracking-normal text-muted-foreground">
          / month
        </span>
      )}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="mt-6 space-y-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground">
        Features:
      </h4>
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-emerald-500" />
          <span className="text-xs font-medium tracking-tight text-muted-foreground">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}
