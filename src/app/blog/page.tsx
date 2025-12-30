import { getAllPosts } from '@/lib/posts';
import BlogList from './BlogList';

export const revalidate = 60;

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <main className="w-full py-4 animate-fade-in font-mono">
      <div className="bg-(--background)  border-(--vsc-border) border-b-0 shadow-xl">
        <header className="p-8 md:p-12 border-b border-(--vsc-border) relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-[10px] select-none leading-tight pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>010110101101010101101010110101</div>
            ))}
          </div>

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-[#6A9955] mb-2 text-sm italic">
                  <span>/** @workspace_status */</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-(--foreground)">
                  SYSTEM_CORE<span className="text-(--accent)">:</span>
                  <span className="opacity-40 uppercase">Journal</span>
                </h1>
              </div>

              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">
                    Build Status
                  </p>
                  <p className="text-[#4EC9B0] text-sm font-bold">
                    ● Optimized
                  </p>
                </div>
                <div className="w-px h-10 bg-(--vsc-border)" />
                <div className="text-right">
                  <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">
                    Environment
                  </p>
                  <p className="text-[#DCDCAA] text-sm font-bold">Production</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-(--vsc-tab)/50 border border-(--vsc-border) p-4 rounded-sm">
                <p className="text-[#569CD6] text-xs font-bold mb-1">
                  Total_Modules
                </p>
                <p className="text-2xl font-bold">{allPosts.length}</p>
                <div className="w-full bg-(--vsc-border) h-1 mt-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#4EC9B0] h-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="bg-(--vsc-tab)/50 border border-(--vsc-border) p-4 rounded-sm">
                <p className="text-[#DCDCAA] text-xs font-bold mb-1">
                  Last_Synced
                </p>
                <p className="text-xl font-bold truncate">Just Now</p>
                <p className="text-[10px] opacity-40 mt-3 italic text-right">
                  via Notion_API_Sync
                </p>
              </div>

              <div className="bg-(--vsc-tab)/50 border border-(--vsc-border) p-4 rounded-sm">
                <p className="text-[#CE9178] text-xs font-bold mb-1">
                  Connectivity
                </p>
                <p className="text-xl font-bold text-[#4EC9B0]">Stable</p>
                <div className="flex gap-1 mt-4">
                  <div className="w-2 h-2 bg-[#4EC9B0] rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-[#4EC9B0] rounded-full opacity-50" />
                  <div className="w-2 h-2 bg-[#4EC9B0] rounded-full opacity-20" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#6A9955]">
                // Ready to serve high-quality contents
              </span>
              <div className="h-px grow bg-(--vsc-border) opacity-30" />
              <span className="opacity-30">v.15.Next</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          <BlogList allPosts={allPosts} />
        </div>
      </div>
    </main>
  );
}
