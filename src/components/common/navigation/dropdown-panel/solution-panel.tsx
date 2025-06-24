"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight,
  Building,
  TrendingUp,
  User,
  Users,
  Mic,
  Workflow,
  Truck,
  Target,
  Wallet,
} from "lucide-react";

import { solutions } from "@/constants/nav-links";
import { Badge } from "@/components/ui/badge";

const iconMap: { [key: string]: any } = {
  building: Building,
  "trending-up": TrendingUp,
  user: User,
  users: Users,
  mic: Mic,
  workflow: Workflow,
  truck: Truck,
  target: Target,
  wallet: Wallet,
};

const getIconForItem = (item: any) => {
  return iconMap[item.icon] || Users;
};

const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case 'Enterprise':
      return 'destructive';
    case 'Business':
      return 'default';
    case 'Starter':
      return 'secondary';
    case 'Popular':
      return 'success';
    case 'Featured':
      return 'warning';
    case 'New':
      return 'info';
    default:
      return 'outline';
  }
};

export function SolutionPanel() {
  const [activeSolution, setActiveSolution] = useState(solutions[0]);
  const [activeItem, setActiveItem] = useState(solutions[0].list[0]);

  return (
    <div className="min-w-[1100px] bg-background p-8">
      <div className="w-full flex flex-col justify-between gap-6 md:flex-row">
        {/* Categories Column */}
        <div className="space-y-6 md:w-1/5">
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">Categories</h2>
          <div className="space-y-1">
            {solutions.map((solution) => (
              <button
                key={solution.name}
                onClick={() => {
                  setActiveSolution(solution);
                  setActiveItem(solution.list[0]);
                }}
                className={`text-sm group flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors hover:bg-accent hover:text-accent-foreground ${
                  activeSolution.name === solution.name ? "bg-accent" : ""
                }`}
              >
                <span>{solution.name}</span>
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="hidden w-px self-stretch bg-border md:block" />

        {/* Products Column */}
        <div className="space-y-6 md:w-2/5">
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            {activeSolution.name}
          </h2>
          <div className="space-y-1">
            {activeSolution.list.map((item, index) => {
              const Icon = getIconForItem(item);
              return (
                <div key={item.name}>
                  <button
                    onMouseOver={() => setActiveItem(item)}
                    onMouseOut={() => setActiveItem(activeItem)}
                    className={`text-sm text-muted-foreground flex w-full items-center gap-3 h-fit text-left transition-colors hover:text-foreground hover:font-bold ${
                      activeItem.name === item.name ? "text-black dark:text-white font-bold" : ""
                    }`}
                  >
                    <div className={`p-1 rounded-md bg-muted ${activeItem.name === item.name ? "bg-muted/20 border border-border text-foreground" : ""}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant={getBadgeVariant(item.badge)} className="w-fit">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </button>
                  {index < activeSolution.list.length - 1 && (
                    <div className="h-px w-full bg-border my-3" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="hidden w-px self-stretch bg-border md:block" />

        {/* Description Column */}
        <div className="space-y-6 md:w-2/5">
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            About
          </h2>
          <div className="space-y-4">
            <div className="relative w-full h-[200px] bg-gradient-to-br from-accent to-accent/20 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {(() => {
                  const Icon = getIconForItem(activeItem);
                  return <Icon className="h-16 w-16 text-muted-foreground/20" />;
                })()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium leading-tight">
                {activeItem.name}
              </h3>
              {activeItem.badge && (
                <Badge variant={getBadgeVariant(activeItem.badge)}>
                  {activeItem.badge}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm">{activeItem.description}</p>
            <Link
              href={activeItem.href}
              className="inline-flex items-center text-sm font-semibold transition-colors hover:text-foreground text-primary"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
