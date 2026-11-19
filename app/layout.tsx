import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = "https://r-saravana.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "R. Saravana — Forward Deployed Engineer Intern",
    template: "%s | R. Saravana",
  },
  description:
    "R. Saravana is a Forward Deployed Engineer Intern at Vilasat AI LLC and a Full Stack Developer building AI-powered solutions and modern web applications.",
  keywords: [
    "R. Saravana",
    "Full Stack Developer",
    "Forward Deployed Engineer Intern",
    "Java Developer",
    "React Developer",
    "AWS Certified",
    "Software Engineer",
    "Portfolio",
    "Andhra Pradesh",
  ],
  authors: [{ name: "R. Saravana" }],
  creator: "R. Saravana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "R. Saravana — Forward Deployed Engineer Intern",
    description:
      "Forward Deployed Engineer Intern at Vilasat AI LLC. Full Stack Developer building AI-powered solutions.",
    siteName: "R. Saravana Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "R. Saravana — Forward Deployed Engineer Intern",
    description:
      "Forward Deployed Engineer Intern at Vilasat AI LLC. Full Stack Developer building AI-powered solutions.",
  },
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#080608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
        <ChatWidget />
      </body>
    </html>
  );
}
