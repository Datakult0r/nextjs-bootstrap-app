import type { Metadata } from "next";
import { plusJakartaSansFont, jetBrainsMonoFont } from "./font";
import "../styles/globals.css";
// import { GHLChatBot as _GHLChatBot } from "@/components/common/widgets/ghl-chatbot";
import { AppProvider } from "@/providers/AppProvider";
// import { Footer as _Footer } from "@/components/common/footer";
// import { Header as _Header } from "@/components/common/Header";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
// import config from "./config";
import LayoutContent from "./LayoutContent";

export const metadata: Metadata = {
  title: "Clinic of AI",
  description: "AI-powered solutions for modern businesses",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <body
        className={`${plusJakartaSansFont.variable} ${jetBrainsMonoFont.variable} font-sans antialiased`}
      >
        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
