import '../styles/globals.css';
import { Metadata } from 'next';
import ClientLayout from '../components/layout/ClientLayout';

export const metadata: Metadata = {
  title: {
    default: 'Young Log',
    template: '%s | Young Log',
  },
  description: '프론트엔드 개발 공부를 기록하는 공간입니다.',
  keywords: ['프론트엔드', 'Next.js', 'React'],
  authors: [{ name: '가영' }],
  openGraph: {
    title: 'Young Log',
    description: '프론트엔드 개발 블로그',
    // images: ['/og-image.png'],
  },
  verification: {
    google: 'rf3bBkNVMMbHw31ppHojzF8le4l54jcGHp7QB73KrzU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2174411552112164"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
