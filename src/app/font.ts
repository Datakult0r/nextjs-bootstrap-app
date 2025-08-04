import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

export const plusJakartaSansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: false,
  fallback: ['system-ui', 'arial'],
});

export const jetBrainsMonoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  fallback: ['monospace', 'courier'],
});
