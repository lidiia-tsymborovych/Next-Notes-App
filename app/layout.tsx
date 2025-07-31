import type { Metadata } from "next";
import "./globals.css";
import BubblesBackground from "./components/BubblesBackground";

export const metadata: Metadata = {
  title: 'Next Notes App — your simple note app',
  description:
    'A lightweight and easy-to-use note app built with Next.js 15. Quickly jot down your thoughts with ease.',

  openGraph: {
    title: 'Next Notes App — your simple note app',
    description:
      'A lightweight and easy-to-use note app built with Next.js 15. Quickly jot down your thoughts with ease.',
    // url: 'https://your-domain.com', 
    siteName: 'Next Notes App',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Next Notes App — your simple note app',
    description:
      'A lightweight and easy-to-use note app built with Next.js 15. Quickly jot down your thoughts with ease.',
  },

  icons: {
    icon: '/favicon.ico', 
  },

  themeColor: '#4f46e5',

  // metadataBase: new URL('https://your-domain.com'), 
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main className='relative'>
          <div className='mx-auto w-full'>{children}</div>
        </main>
        <BubblesBackground />
      </body>
    </html>
  );
}
