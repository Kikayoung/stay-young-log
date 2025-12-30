'use client';

import { useRouter } from 'next/navigation';

export default function RightBar({
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
  const tagStyles = [
    {
      bg: 'bg-[#4fc1ff]/10',
      text: 'text-[#4fc1ff]',
      border: 'border-[#4fc1ff]/30',
    },
    {
      bg: 'bg-[#ce9178]/10',
      text: 'text-[#ce9178]',
      border: 'border-[#ce9178]/30',
    },
    {
      bg: 'bg-[#b5cea8]/10',
      text: 'text-[#b5cea8]',
      border: 'border-[#b5cea8]/30',
    },
    {
      bg: 'bg-[#4ec9b0]/10',
      text: 'text-[#4ec9b0]',
      border: 'border-[#4ec9b0]/30',
    },
    {
      bg: 'bg-[#c586c0]/10',
      text: 'text-[#c586c0]',
      border: 'border-[#c586c0]/30',
    },
    {
      bg: 'bg-[#dcdcaa]/10',
      text: 'text-[#dcdcaa]',
      border: 'border-[#dcdcaa]/30',
    },
  ];
  return (
    <aside className="w-64 shrink-0 border-l border-(--vsc-border) bg-(--background) hidden xl:flex flex-col h-full select-none overflow-y-auto custom-scrollbar p-6 space-y-9 tracking-tight">
      <section className="space-y-4">
        <h2 className="text-[17px] text-(--foreground) font-medium font-sans">
          Outline
        </h2>
        <div className="space-y-2.5 text-[13px] font-sans">
          {toc.length > 0 ? (
            toc.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="block text-(--foreground) opacity-60 hover:opacity-100 hover:text-(--accent) transition-all truncate leading-snug"
                style={{ paddingLeft: `${(item.depth - 1) * 12}px` }}
              >
                {item.title}
              </a>
            ))
          ) : (
            <p className="opacity-30 italic font-mono text-[12px]">
              No headers found
            </p>
          )}
        </div>
      </section>

      <hr className="border-(--vsc-border)/40" />

      <section className="space-y-4">
        <h2 className="text-[17px] text-(--foreground) font-medium font-sans">
          Metadata
        </h2>
        <div className="space-y-3.5 text-[13px]">
          <div className="grid grid-cols-[90px_1fr] gap-3">
            <span className="text-(--foreground) font-semibold font-sans">
              Identifier
            </span>
            <span className="text-(--foreground) opacity-70 font-mono text-[12px] pt-0.5">
              young.{slug}
            </span>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3">
            <span className="text-(--foreground) font-semibold font-sans">
              Category
            </span>
            <span className="text-[#3794FF] font-sans hover:underline cursor-pointer">
              {category}
            </span>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3">
            <span className="text-(--foreground) font-semibold font-sans">
              Version
            </span>
            <span className="text-(--foreground) opacity-70 font-mono text-[12px]">
              1.0.4
            </span>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3">
            <span className="text-(--foreground) font-semibold font-sans">
              Size
            </span>
            <span className="text-[#3794FF] font-mono text-[12px] hover:underline cursor-pointer">
              128.45KB
            </span>
          </div>
        </div>
      </section>

      <hr className="border-(--vsc-border)/40" />

      <hr className="border-(--vsc-border)/40" />

      <section className="space-y-4">
        <h2 className="text-[17px] text-(--foreground) font-medium font-sans">
          Keywords
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag: any) => {
            const charCodeSum = tag
              .split('')
              .reduce(
                (acc: number, char: string) => acc + char.charCodeAt(0),
                0,
              );

            const styleIndex = charCodeSum % tagStyles.length;
            const style = tagStyles[styleIndex];

            return (
              <button
                key={tag}
                onClick={() => router.push(`/blog?tag=${tag}`)}
                className={`
                  px-2 py-1 border text-[11px] font-mono rounded-[3px] transition-all uppercase
                  hover:brightness-125 hover:scale-105
                  ${style.bg} ${style.text} ${style.border}
                `}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
