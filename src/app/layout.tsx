import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b w-full">
          <nav className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              YOUNG.
            </Link>
            <div className="space-x-10 font-bold text-base text-gray-600">
              <Link href="/blog" className="hover:text-black">
                Young Log
              </Link>
              <Link href="/side" className="hover:text-black">
                Side
              </Link>
              <Link href="/about" className="hover:text-black">
                About
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow w-full max-w-[1440px] mx-auto px-8 py-10">
          {children}
        </main>

        <footer className="border-t py-12 bg-gray-50 w-full">
          <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center text-sm text-gray-500">
            <p>© 2025 Kayoung. Stay Young, Stay Foolish.</p>
            <div className="space-x-6 font-medium">
              <a
                href="https://github.com/Kikayoung"
                className="hover:text-black"
              >
                Github
              </a>
              <a
                href="mailto:kayoung7189@naver.com"
                className="hover:text-black"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
