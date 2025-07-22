"use client";

import React from "react";
import { educationPaths } from "@/constants/nav-links";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AIArchitectPage() {
  // Find the AI-Architect path data from constants
  const aiArchitect = educationPaths.find((path) => path.name === "AI-Architect");

  if (!aiArchitect) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">AI-Architect Path Not Found</h1>
        <p>The AI-Architect education path data is not available.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-teal-600">{aiArchitect.name}</h1>
      <p className="mb-6 text-lg">{aiArchitect.description}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiArchitect.modules.map((module, index) => (
            <Card key={index} className="border-teal-400">
              <CardHeader>
                <CardTitle>{module.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-teal-500">
                  Progress: {module.progress}%
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Link href="/ai-education" className="text-teal-600 underline">
          &larr; Back to AI Education
        </Link>
      </div>
    </section>
  );
}
