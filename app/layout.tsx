import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

const siteUrl = 'https://r-saravana.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'R. Saravana — Full Stack Developer',
    template: '%s | R. Saravana',
  },
  description:
    'R. Saravana is a Full Stack Developer, Java Developer and AWS Certified engineer building modern web applications with clean code, scalable architecture and beautiful user experiences.',
  keywords: [
    'R. Saravana',
    'Full Stack Developer',
    'Java Developer',
    'React Developer',
    'AWS Certified',
    'Software Engineer',
    'Portfolio',
    'Andhra Pradesh',
  ],
  authors: [{ name: 'R. Saravana' }],
  creator: 'R. Saravana',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'R. Saravana — Full Stack Developer',
    description:
      'Full Stack Developer | Java Developer | AWS Certified | Problem Solver. Building modern, scalable web applications.',
    siteName: 'R. Saravana Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'R. Saravana — Full Stack Developer',
    description:
      'Full Stack Developer | Java Developer | AWS Certified | Problem Solver.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#050816',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
