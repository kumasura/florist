import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florist | Dynamic Visualization Studio",
  description:
    "An open-source Next.js and D3 studio for generating dynamic, interactive visualizations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
