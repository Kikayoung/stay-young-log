'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    CUSDIS?: {
      setTheme: (theme: 'dark' | 'light') => void;
      render: () => void;
    };
  }
}

export default function Comments({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const initCusdis = () => {
      if (window.CUSDIS && typeof window.CUSDIS.render === 'function') {
        window.CUSDIS.setTheme(resolvedTheme === 'dark' ? 'dark' : 'light');
        window.CUSDIS.render();
      }
    };

    const timer = setTimeout(initCusdis, 300);

    return () => clearTimeout(timer);
  }, [slug, resolvedTheme, mounted]);

  if (!mounted) return <div className="min-h-50" />;

  return (
    <div className="mt-20 pt-10 border-t border-(--accent)/10">
      <h3 className="text-xl font-black mb-8 text-(--foreground)">Comments</h3>
      <div
        id="cusdis_thread"
        key={slug}
        data-host="https://cusdis.com"
        data-app-id={process.env.NEXT_PUBLIC_CUSDIS_APP_ID}
        data-page-id={slug}
        data-page-title={title}
        data-page-url={`https://stay-young-log.vercel.app/blog/${slug}`}
        data-theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      ></div>
      <script async defer src="https://cusdis.com/js/cusdis.es.js"></script>
    </div>
  );
}
