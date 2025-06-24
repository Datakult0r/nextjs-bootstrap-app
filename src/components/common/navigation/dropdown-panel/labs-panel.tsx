"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Beaker, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { lab } from "@/constants/nav-links";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'destructive';
    default:
      return 'default';
  }
};

const getTypeIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'research':
      return Beaker;
    case 'development':
      return Rocket;
    default:
      return GraduationCap;
  }
};

export function LabsPanel() {
  return (
    <div className="min-w-[1100px] bg-background p-8">
      <div className="grid grid-cols-3 gap-8">
        {lab.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {section.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {section.description}
              </p>
            </div>

            <div className="space-y-4">
              {section.list?.map((item, itemIdx) => {
                const isLearningPath = 'difficulty' in item;
                const isResearch = 'type' in item;
                const Icon = isResearch ? getTypeIcon(item.type) : GraduationCap;
                
                return (
                  <div key={itemIdx} className="group">
                    <Link
                      href={item.href}
                      className="block space-y-3 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-background p-2 group-hover:bg-muted">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>

                      {/* Show difficulty badge and progress for learning paths */}
                      {isLearningPath && (
                        <div className="flex items-center justify-between">
                          <Badge variant={getDifficultyColor(item.difficulty)}>
                            {item.difficulty}
                          </Badge>
                          {typeof item.progress === 'number' && (
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {item.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Show type badge for research items */}
                      {isResearch && (
                        <Badge variant="outline">
                          {item.type}
                        </Badge>
                      )}
                    </Link>
                    {itemIdx < (section.list?.length ?? 0) - 1 && (
                      <div className="my-4 h-px bg-border" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
