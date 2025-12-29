'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Explorer({
  slug,
  toc,
  category,
  tags,
}: {
  slug: string;
  toc: any[];
  category: string;
  tags: string[];
}) {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({
    explorer: true,
    outline: true,
    tags: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-64 shrink-0 border-r border-(--vsc-border) bg-(--vsc-tab) hidden lg:flex flex-col sticky top-0 h-screen select-none font-mono">
      <div className="flex flex-col">
        <div
          onClick={() => toggleSection('explorer')}
          className="flex items-center gap-1 px-2 py-1 bg-(--vsc-border)/20 text-[11px] font-bold opacity-80 cursor-pointer border-y border-(--vsc-border)/30"
        >
          <span
            className={`text-[8px] transition-transform ${
              openSections.explorer ? 'rotate-0' : '-rotate-90'
            }`}
          >
            ▼
          </span>
          EXPLORER
        </div>
        {openSections.explorer && (
          <div className="py-2">
            <div className="flex items-center gap-2 px-6 py-1 text-[13px] bg-(--accent-soft) text-(--accent) font-medium border-r-2 border-(--accent)">
              <span className="text-[#519aba]">📝</span>
              <span className="truncate">{slug}.md</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col border-t border-(--vsc-border)/30">
        <div
          onClick={() => toggleSection('outline')}
          className="flex items-center gap-1 px-2 py-1 bg-(--vsc-border)/20 text-[11px] font-bold opacity-80 cursor-pointer border-b border-(--vsc-border)/30"
        >
          <span
            className={`text-[8px] transition-transform ${
              openSections.outline ? 'rotate-0' : '-rotate-90'
            }`}
          >
            ▼
          </span>
          OUTLINE
        </div>
        {openSections.outline && (
          <div className="py-2 max-h-[30vh] overflow-y-auto custom-scrollbar">
            {toc.map((item, index) => (
              <a
                key={index}
                href={item.url}
                style={{ paddingLeft: `${(item.depth - 2) * 12 + 20}px` }}
                className="flex items-center gap-2 py-1 text-[11px] opacity-60 hover:opacity-100 hover:text-(--accent) hover:bg-(--vsc-border)/20 transition-all truncate"
              >
                <span className="text-(--accent) opacity-40">#</span>
                <span className="truncate">{item.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col border-t border-(--vsc-border)/30 grow">
        <div
          onClick={() => toggleSection('tags')}
          className="flex items-center gap-1 px-2 py-1 bg-(--vsc-border)/20 text-[11px] font-bold opacity-80 cursor-pointer border-b border-(--vsc-border)/30"
        >
          <span
            className={`text-[8px] transition-transform ${
              openSections.tags ? 'rotate-0' : '-rotate-90'
            }`}
          >
            ▼
          </span>
          KEYWORDS
        </div>
        {openSections.tags && (
          <div className="p-4 flex flex-wrap gap-2">
            {/* 카테고리를 메인 태그로 배치 */}
            <button
              onClick={() => router.push(`/blog?category=${category}`)}
              className="px-2 py-0.5 bg-(--accent) text-white text-[10px] rounded-sm hover:brightness-110 transition-all"
            >
              folder:{category}
            </button>

            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => router.push(`/blog?tag=${tag}`)}
                  className="px-2 py-0.5 bg-(--vsc-border)/40 text-(--foreground) opacity-70 text-[10px] rounded-sm border border-(--vsc-border) hover:border-(--accent) hover:text-(--accent) transition-all"
                >
                  tag:{tag}
                </button>
              ))
            ) : (
              <span className="text-[10px] opacity-30 italic px-2">
                No keywords.
              </span>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
