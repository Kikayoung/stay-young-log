import React from 'react';
import { notFound } from 'next/navigation';
import Explorer from '@/components/Explorer';
import { getPostData } from '@/lib/posts';
import { getToc } from '@/lib/toc';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}
export default async function BlogDetailLayout({
  children,
  params,
}: BlogLayoutProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  if (!postData) return notFound();
  const toc = getToc(postData.content);

  return (
    <div className="flex w-full min-h-screen bg-(--background)">
      <Explorer
        slug={slug}
        toc={toc}
        category={postData.category}
        tags={postData.tags}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8 md:p-12">{children}</div>
        </div>
      </main>
    </div>
  );
}
