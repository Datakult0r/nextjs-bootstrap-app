import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { GHLChatBot } from "@/components/common/widgets/ghl-chatbot";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/Header";

import { AppProvider } from "@/providers/AppProvider";

import { plusJakartaSansFont, jetBrainsMonoFont } from "./font";
export { meta as metadata } from "./metadata";
import config from "./config";
import LayoutContent from "./LayoutContent";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <body
        className={`${plusJakartaSansFont.variable} ${jetBrainsMonoFont.variable}`}
      >
        <NextTopLoader
          color="#00FFFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={1600}
          showAtBottom={false}
        />

        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
        </AppProvider>
      </body>
    </html>
  );
}
