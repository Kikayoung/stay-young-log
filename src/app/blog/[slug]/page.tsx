import { getPostData, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// params 앞에 await를 쓰는 것이 최신 Next.js의 규칙
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostData(slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-gray-400">
          글을 찾을 수 없어요 🥲
        </h1>
        <p className="text-gray-400 mt-2">Slug: {slug}</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-20 px-4">
      <header className="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
        <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 tracking-tighter">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-gray-500 mb-4 italic">
            {post.description}
          </p>
        )}
        <time className="text-gray-400 text-lg">{post.date}</time>
      </header>

      <section className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-img:rounded-3xl prose-a:text-blue-600 no-underline hover:prose-a:underline">
        <MDXRemote source={post.content} />
      </section>
    </article>
  );
}
