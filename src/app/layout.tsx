import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { TooltipProvider } from "~/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import TopNavBar from "~/components/top-nav-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mooneycalc",
  description: "Milky Way Idle Game Calculator",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <TooltipProvider>
          <main className="flex min-h-screen flex-col">
            <div className="container flex flex-col gap-8 py-12">
              <TopNavBar />
              {children}
            </div>
          </main>
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
