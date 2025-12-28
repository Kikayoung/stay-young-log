'use client';

import { useEffect, useState } from 'react';

export default function Comments({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-20 pt-10 border-t border-(--accent)/10">
      <h3 className="text-xl font-black mb-8 text-(--foreground)">Comments</h3>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id={process.env.NEXT_PUBLIC_CUSDIS_APP_ID}
        data-page-id={slug}
        data-page-title={title}
        data-page-url={`https://stay-young-log.vercel.app/blog/${slug}`}
        data-theme="auto"
      ></div>
      <script async defer src="https://cusdis.com/js/cusdis.es.js"></script>
    </div>
  );
}
