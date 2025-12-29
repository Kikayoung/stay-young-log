import { getPostData, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Comments from '../../../components/Comment';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣-]/g, '');
};

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono border border-dashed border-(--vsc-border) m-10">
        <h1 className="text-xl font-bold text-[#CD3131] uppercase tracking-widest">
          Error: Post_Not_Found
        </h1>
        <p className="mt-2 text-sm opacity-50">
          Cannot resolve module: @/blog/{slug}
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-5xl mx-auto font-mono">
      <div className="flex items-center gap-2 px-6 py-2 text-[11px] opacity-40 border-b border-(--vsc-border) bg-(--background)">
        <Link
          href="/"
          className="hover:opacity-100 hover:text-(--accent) transition-all"
        >
          src
        </Link>
        <span>{'>'}</span>
        <Link
          href="/blog"
          className="hover:opacity-100 hover:text-(--accent) transition-all"
        >
          extensions
        </Link>
        <span>{'>'}</span>
        <Link
          href={`/blog?category=${post.category}`}
          className="flex items-center gap-1 text-[#4EC9B0] hover:brightness-110 transition-all"
        >
          {post.category}
        </Link>
        <span>{'>'}</span>
        <span className="opacity-100 font-bold">{slug}.mdx</span>
      </div>
      <header className="p-8 md:p-12 border-b border-(--vsc-border) bg-(--vsc-tab)/20">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-(--vsc-tab) border border-(--vsc-border) rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-xl">
            {post.thumbnail ? (
              <img
                src={post.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">📄</span>
            )}
          </div>

          <div className="grow space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-(--foreground) tracking-tighter">
                {post.title}
              </h1>
              <span className="px-2 py-0.5 bg-(--accent) text-white text-xs rounded-sm font-bold">
                v1.0.0
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-(--accent)">
              <span className="hover:underline cursor-pointer">@young_log</span>
              <span className="opacity-20 text-(--foreground)">|</span>
              <span className="text-(--foreground) opacity-60 font-medium italic">
                {post.category}
              </span>
              <span className="opacity-20 text-(--foreground)">|</span>
              <span className="text-(--foreground) opacity-60 font-normal">
                Published on {post.date}
              </span>
            </div>

            <p className="text-lg text-(--foreground) opacity-70 leading-relaxed italic max-w-3xl">
              "
              {post.description ||
                'No description provided for this extension.'}
              "
            </p>

            <div className="flex gap-3 pt-2">
              <button className="px-6 py-1.5 bg-[#007ACC] text-white text-xs font-bold rounded-sm">
                Install
              </button>
              <button className="px-6 py-1.5 border border-(--vsc-border) text-xs font-bold rounded-sm hover:bg-(--vsc-tab)">
                Disable
              </button>
              <button className="px-4 py-1.5 border border-(--vsc-border) text-xs font-bold rounded-sm">
                ⚙
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-(--background) p-6 md:p-16 relative">
        <div className="flex gap-8 border-b border-(--vsc-border) mb-12 text-sm font-bold">
          <div className="border-b-2 border-(--accent) pb-2 text-(--foreground)">
            Details
          </div>
          <div className="opacity-30 pb-2">Changelog</div>
          <div className="opacity-30 pb-2">Dependencies</div>
        </div>

        <section className="relative pl-10 border-l border-(--vsc-border) mb-20">
          <div
            className="prose prose-slate dark:prose-invert max-w-none
            font-sans
            text-(--foreground) 
            prose-p:text-(--foreground) prose-p:opacity-90 prose-p:leading-[1.8] prose-p:text-lg
            prose-headings:font-bold prose-headings:text-(--foreground)
            prose-h2:text-2xl prose-h2:text-[#4EC9B0] prose-h2:border-b prose-h2:border-(--vsc-border) prose-h2:pb-2
            prose-a:text-(--accent) prose-a:no-underline hover:prose-a:underline
            prose-code:bg-(--vsc-tab) prose-code:px-1.5 prose-code:rounded prose-code:text-(--accent)
            prose-blockquote:border-l-4 prose-blockquote:border-[#6A9955] prose-blockquote:bg-(--vsc-tab) prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:text-[#6A9955]
          "
          >
            <MDXRemote
              source={post.content}
              components={{
                h2: (props) => {
                  const id = slugify(String(props.children));
                  return <h2 {...props} id={id} className="scroll-mt-30" />;
                },
                h3: (props) => {
                  const id = slugify(String(props.children));
                  return <h3 {...props} id={id} className="scroll-mt-30" />;
                },
              }}
            />{' '}
          </div>
        </section>

        <footer className="mt-32 pt-10 border-(--vsc-border) bg-(--vsc-tab)/10 p-8 rounded-lg">
          <Comments slug={slug} />
        </footer>
      </div>
    </article>
  );
}
