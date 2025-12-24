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
    <div className="flex flex-col md:flex-row gap-12 w-full">
      {/* 왼쪽 사이드바 */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-32">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">
            Categories
          </h3>
          <ul className="space-y-6">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-lg font-bold transition-all ${
                    selectedCategory === cat
                      ? 'text-blue-600'
                      : 'text-gray-400 hover:text-black'
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
      <div className="flex-grow flex flex-col gap-12">
        {filteredPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="w-full md:w-72 aspect-video bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
              {post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold">
                  YOUNG LOG
                </div>
              )}
            </div>
            <div>
              <span className="text-sm font-bold text-blue-500 uppercase">
                {post.category}
              </span>
              <h2 className="text-2xl font-black mt-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 mt-2 line-clamp-2">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
