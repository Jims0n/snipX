import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import SnippetModalWrapper from "@/components/snippet-modal-wrapper";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "snipX",
  description: "snipX is a tool that helps you save and share code snippets.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user || null;
  
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-gray-900 text-white min-h-screen`}
      >
        <SnippetModalWrapper>
          <Header initialUser={user} />
        </SnippetModalWrapper>
        {children}
      </body>
    </html>
  );
}
