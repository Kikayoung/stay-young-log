import { getAllPosts } from '@/lib/posts';
import BlogList from './BlogList';

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <main className="w-full">
      <BlogList allPosts={allPosts} />
    </main>
  );
}
