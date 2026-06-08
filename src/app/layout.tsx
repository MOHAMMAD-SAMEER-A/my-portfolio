import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Sameer A | Software Developer Portfolio",
  description: "Personal brand, developer portfolio, and resume website of Mohammad Sameer A, Software Developer Intern & B.Tech Information Technology Student.",
  keywords: [
    "Mohammad Sameer A",
    "Software Developer",
    "Java Developer",
    "Python Developer",
    "React Developer",
    "B.Tech Information Technology",
    "Developer Portfolio",
    "Internship Portfolio",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Mohammad Sameer A" }],
  creator: "Mohammad Sameer A",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammadsameer.dev", // Will be resolved dynamically
    title: "Mohammad Sameer A | Software Developer",
    description: "Building practical software solutions through continuous learning, real-world projects, and modern technologies.",
    siteName: "Mohammad Sameer A Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Mohammad Sameer A Profile Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Sameer A | Software Developer",
    description: "Building practical software solutions through continuous learning, real-world projects, and modern technologies.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
