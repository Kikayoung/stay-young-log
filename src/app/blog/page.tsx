import { getAllPosts } from '@/lib/posts';
import BlogList from './BlogList';

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <main className="w-full">
      <BlogList allPosts={allPosts} />
    </main>
  );
}
