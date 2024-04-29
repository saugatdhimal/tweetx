import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TwitterX",
  description: "TwitterX Build With Nextjs, Supabase, Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-900 min-h-screen flex">{children}</div>
      </body>
    </html>
  );
}
