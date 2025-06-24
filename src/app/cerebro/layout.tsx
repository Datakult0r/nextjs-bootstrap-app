import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cerebro AI Learning Hub",
  description: "Master AI and cybersecurity through interactive 3D skill trees and personalized learning paths",
};

export default function CerebroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
