import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { FavoritesProvider } from "@/lib/FavoritesContext";
import { UIProvider } from "@/lib/UITransitionContext";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Find your movie here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </UIProvider>
      </body>
    </html>
  );
}
