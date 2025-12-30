import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="mx-auto py-4 font-mono animate-fade-in">
      <div className="bg-(--background) border-(--vsc-border) shadow-xl overflow-hidden">
        <section className="relative p-6 md:p-12 border-b border-(--vsc-border)">
          <div className="absolute top-4 right-8 opacity-5 select-none text-[10px] leading-tight">
            {'import React from "react";'}
            <br />
            {'import { Record } from "@/types";'}
            <br />
            {'// system.analytics.initialize()'}
          </div>

          <div className="relative pl-10 border-(--vsc-border)/50">
            <div className="absolute left-0 top-0 text-(--foreground) opacity-20 text-right w-8 text-xs leading-[1.7] select-none">
              1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />
              10
              <br />
              11
            </div>

            <div className="space-y-1 text-sm md:text-base leading-[1.7]">
              <p className="text-[#008000] dark:text-[#6A9955] italic">
                /** @author 가영(Young) */
              </p>
              <p className="text-[#008000] dark:text-[#6A9955] italic">
                /** @description Stay Young, Record Everything. */
              </p>

              <div className="pt-2">
                <span className="text-[#AF00DB] dark:text-[#C586C0]">
                  export
                </span>{' '}
                <span className="text-[#0000FF] dark:text-[#569CD6]">
                  async function
                </span>{' '}
                <span className="text-[#795E26] dark:text-[#DCDCAA]">
                  initArchive
                </span>
                () {'{'}
              </div>

              <div className="pl-6">
                <span className="text-[#0000FF] dark:text-[#569CD6]">
                  const
                </span>{' '}
                <span className="text-[#001080] dark:text-[#9CDCFE]">bio</span>{' '}
                = {'{'}
                <br />
                &nbsp;&nbsp;
                <span className="text-[#001080] dark:text-[#9CDCFE]">
                  status
                </span>
                :{' '}
                <span className="text-[#A31515] dark:text-[#CE9178]">
                  "Always Growing"
                </span>
                ,<br />
                &nbsp;&nbsp;
                <span className="text-[#001080] dark:text-[#9CDCFE]">
                  philosophy
                </span>
                :{' '}
                <span className="text-[#A31515] dark:text-[#CE9178]">
                  "기록이 기억을 지배한다"
                </span>
                <br />
                {'}'};
              </div>

              <div className="pl-6 pt-2">
                <span className="text-[#AF00DB] dark:text-[#C586C0]">
                  await
                </span>{' '}
                <Link
                  href="/about"
                  className="text-[#795E26] dark:text-[#DCDCAA] hover:underline underline-offset-4 decoration-[#007ACC]"
                >
                  loadAboutMe
                </Link>
                ();
              </div>

              <div className="text-(--foreground) opacity-50">{'}'}</div>
            </div>

            <div className="mt-12 pointer-events-none">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-(--foreground)">
                STAY YOUNG,
                <br />
                RECORD{' '}
                <span className="text-(--accent) underline decoration-4 underline-offset-8">
                  EVERYTHING
                </span>
                .
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-(--vsc-tab)/20">
          <div className="flex items-center gap-3 px-6 py-3 border-b border-(--vsc-border) bg-(--vsc-tab) text-[11px] font-bold opacity-70 uppercase tracking-widest">
            <span className="text-[#4EC9B0]">●</span> Git Graph: Recent Commits
          </div>

          <div className="divide-y divide-(--vsc-border)/50">
            {recentPosts.map((post: any, index: number) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group flex items-center gap-6 p-6 hover:bg-(--vsc-tab)/50 transition-all relative overflow-hidden"
              >
                <div className="absolute left-7.5 top-0 bottom-0 w-px bg-(--vsc-border)" />
                <div className="z-10 w-3 h-3 rounded-full bg-(--accent) border-2 border-(--background) group-hover:scale-125 transition-transform" />

                <div className="grow min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[#569CD6] font-mono text-xs font-bold shrink-0">
                      feat(#{post.category || 'post'}):
                    </span>
                    <h2 className="text-lg font-bold text-(--foreground) group-hover:text-(--accent) transition-colors truncate">
                      {post.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] opacity-40 font-mono italic">
                    <span>hash: {post.slug.substring(0, 7)}</span>
                    <span>|</span>
                    <span>committed on {post.date}</span>
                  </div>
                </div>

                <div className="hidden sm:block w-24 h-16 rounded border border-(--vsc-border) bg-(--background) shrink-0 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt=""
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] opacity-20">
                      NO_IMG
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/blog"
            className="block text-center py-4 text-xs font-bold text-(--accent) hover:bg-(--vsc-tab) transition-colors"
          >
            $ git log --oneline --all --graph
          </Link>
        </section>

        <footer className="p-8 border-t border-(--vsc-border) text-center">
          <p className="text-[10px] opacity-20 tracking-[0.5em] font-bold">
            EOF (END OF FILE)
          </p>
        </footer>
      </div>
    </div>
  );
}
