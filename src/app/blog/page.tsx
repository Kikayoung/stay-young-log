import { getAllPosts } from '@/lib/posts';
import BlogList from './BlogList';

export const revalidate = 60;

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <main className="w-full py-12 md:py-20 animate-fade-in">
      <header className="mb-20">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-(--foreground)">
          JOURNAL <span className="text-(--accent)">.</span>
        </h1>
        <p className="mt-4 text-(--foreground) opacity-60 font-medium">
          생각과 기록이 머무는 공간입니다.
        </p>
      </header>

      <BlogList allPosts={allPosts} />
    </main>
  );
}
