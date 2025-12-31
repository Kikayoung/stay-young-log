import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postUrls = posts.map((post: any) => ({
    url: `https://y0ung.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: 'https://y0ung.dev',
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
