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
        <main className='relative'>
          <div className='mx-auto w-full'>{children}</div>
        </main>
      </body>
    </html>
  );
}
