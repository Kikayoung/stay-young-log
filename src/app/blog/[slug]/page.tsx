import { getAllPosts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
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

  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return <div>글을 찾을 수 없습니다: {slug}</div>;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);

  return (
    <article className="max-w-2xl mx-auto py-20 px-4">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
        <time className="text-gray-400">{data.date}</time>
      </header>
      <section className="prose lg:prose-xl">
        <MDXRemote source={content} />
      </section>
    </article>
  );
}
