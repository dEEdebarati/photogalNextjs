import "./globals.css";
import type { Metadata } from "next";

import NavBar from "./components/NavBar";
export const revalidate = 3600


export const metadata: Metadata = {
  title: "Photo gallery",
  description: "using next.js by dee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body >
      <NavBar />
        <main className="max-w-6xl mx-auto">
        {children}
          </main>
        </body>
    </html>
  );
}
