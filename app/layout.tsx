import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Next Notes App',
  description: 'Simple note taking app with Next.js 15',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div className='p-4 sm:p-8 xl:p-16 min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  );
}
