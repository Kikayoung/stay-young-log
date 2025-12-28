'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BlogList({ allPosts = [] }: { allPosts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 카테고리 목록
  const categories = [
    '전체',
    ...Array.from(
      new Set(allPosts.map((post) => post.category).filter(Boolean)),
    ),
  ];

  const filteredPosts =
    selectedCategory === '전체'
      ? allPosts
      : allPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row gap-16">
      {/* 왼쪽 사이드바 */}
      <aside className="md:w-48 shrink-0">
        <div className="sticky top-40">
          <ul className="flex md:flex-col gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'text-(--accent) border-b-2 border-(--accent)'
                      : 'text-(--foreground) opacity-30 hover:opacity-100 hover:text-(--accent)'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 글 리스트 */}
      <div className="grow space-y-24">
        {filteredPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group block"
          >
            <article className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-60 aspect-4/3 bg-(--accent)/5 rounded-[2.5rem] overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] tracking-[0.2em] font-black text-(--accent)/20">
                    YOUNG LOG
                  </div>
                )}
              </div>

              <div className="grow py-2">
                <p className="text-[11px] font-black tracking-[0.3em] text-(--accent) uppercase mb-4 opacity-80">
                  {post.category}
                </p>

                <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tighter mb-4 break-keep text-(--foreground) transition-colors duration-300 group-hover:text-(--accent)">
                  {post.title}
                </h2>

                <p className="text-(--foreground) opacity-70 leading-relaxed font-medium line-clamp-2 max-w-xl group-hover:opacity-100 transition-all">
                  {post.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
