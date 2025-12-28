import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="space-y-32 py-20">
      <section className="animate-fade-in px-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[0.9] text-[var(--foreground)]">
          Stay Young, <br />
          Record <span className="text-(--accent)">Everything.</span>
        </h1>
        <p className="text-xl md:text-xl text-(--foreground) opacity-60 max-w-2xl leading-relaxed font-medium">
          이 블로그는 제가 경험한 일상과 지식을 기록하는{' '}
          <br className="hidden md:block" />
          저의 독자적인 아카이브입니다.
        </p>
        <div className="mt-12">
          <Link
            href="/about"
            className="inline-block px-10 py-4 bg-(--accent) text-(--background) rounded-full font-black text-lg hover:brightness-110 hover:scale-105 transition-all shadow-lg shadow-[(--accent)]/20"
          >
            ABOUT ME
          </Link>
        </div>
      </section>

      <section className="px-4">
        <div className="flex justify-between items-end mb-12 border-b border-(--accent)/10 pb-6">
          <h2 className="text-3xl font-black tracking-tighter text-(--foreground)">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="text-(--accent) font-black text-sm tracking-widest hover:opacity-60 transition-opacity"
          >
            VIEW ALL +
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {recentPosts.map((post: any) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-56 h-36 bg-(--accent)/5 rounded-4xl overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] tracking-[0.2em] font-black text-(--accent)/20">
                    YOUNG LOG
                  </div>
                )}
              </div>
              <div className="grow">
                <span className="text-[11px] text-(--accent) font-black tracking-widest uppercase opacity-60">
                  {post.date}
                </span>
                <h3 className="text-2xl font-black mt-2 text-(--foreground) group-hover:text-(--accent) transition-colors tracking-tight">
                  {post.title}
                </h3>
                <p className="text-(--foreground) opacity-50 line-clamp-1 mt-2 text-base font-medium">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
