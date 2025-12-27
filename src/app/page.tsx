import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="space-y-24 py-10">
      <section className="animate-fade-in">
        <h1 className="text-6xl font-black tracking-tighter mb-8">
          Stay Young, <br />
          Record Everything.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          이 블로그는 제가 경험한 일상과 지식을 기록하는 공간입니다.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/about"
            className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
          >
            더 알아보기
          </Link>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-black">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-blue-600 font-bold hover:underline"
          >
            더 보기 +
          </Link>
        </div>

        <div className="flex flex-col gap-10">
          {recentPosts.map((post: any) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group flex gap-8 items-center"
            >
              <div className="w-40 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-bold">
                    NO IMG
                  </div>
                )}
              </div>
              <div>
                <span className="text-sm text-blue-500 font-bold">
                  {post.date}
                </span>
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 line-clamp-1 mt-1 text-sm">
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
