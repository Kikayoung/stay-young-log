'use client';

export default function About() {
  return (
    <div className="py-12 animate-fade-in max-w-4xl mx-auto font-mono pb-24">
      <div className="px-4">
        <section className="mb-24">
          <div className="flex items-center gap-2 text-[#0000FF] dark:text-[#569CD6] mb-4 opacity-50">
            <span className="text-xl">#</span>
            <span className="text-xs font-bold tracking-widest">
              INTRODUCTION
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-(--foreground)">
            안녕하세요, <br />
            <span className="text-(--accent)">가영(Young)</span>입니다.
            <span className="animate-pulse">_</span>
          </h1>

          <div className="space-y-6 text-base md:text-lg text-(--foreground) opacity-80 leading-relaxed max-w-2xl border-l-4 border-(--vsc-border) pl-6 py-2 italic mb-12">
            <p>“오늘의 나를 더 성장하게 만들어 나가는 과정을 좋아합니다.”</p>
            <p className="not-italic opacity-70 text-sm md:text-base">
              React와 TypeScript를 주로 사용하는 프론트엔드 개발자입니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://github.com/kikayoung"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[#007ACC] text-white font-bold text-sm hover:brightness-110 transition-all rounded-sm flex items-center gap-2"
            >
              <span>$</span> git checkout github
            </a>
            {/* <a
          href="https://linkedin.com/..."// 링크드인 없음ㅜㅜ
          className="px-5 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all"
        >
          LinkedIn
        </a> */}
            <a
              href="mailto:kayoung7189@naver.com"
              className="px-6 py-2 border border-[#007ACC] text-[#007ACC] dark:border-[#3794FF] dark:text-[#3794FF] font-bold text-sm hover:bg-[#007ACC] hover:text-white transition-all rounded-sm"
            >
              mailto:kayoung7189@naver.com
            </a>
          </div>
        </section>

        <section className="mb-32">
          <div className="flex items-center gap-2 text-[#0000FF] dark:text-[#569CD6] mb-8 opacity-50">
            <span className="text-xl">##</span>
            <span className="text-xs font-bold tracking-widest">
              TECH_STACK.ts
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 border border-(--vsc-border) rounded-sm bg-(--vsc-tab)/30">
              <h3 className="text-[#569CD6] font-bold mb-3 text-sm">
                Frontend
              </h3>
              <ul className="text-xs space-y-2 opacity-70">
                <li>• React / Next.js 15</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div className="p-4 border border-(--vsc-border) rounded-sm bg-(--vsc-tab)/30">
              <h3 className="text-[#4EC9B0] font-bold mb-3 text-sm">DB</h3>
              <ul className="text-xs space-y-2 opacity-70">
                <li>• Supabase (Realtime)</li>
                <li>• PostgreSQL</li>
                <li>• Notion API (CMS)</li>
              </ul>
            </div>
            <div className="p-4 border border-(--vsc-border) rounded-sm bg-(--vsc-tab)/30">
              <h3 className="text-[#DCDCAA] font-bold mb-3 text-sm">Tools</h3>
              <ul className="text-xs space-y-2 opacity-70">
                <li>• Github</li>
                <li>• Vercel</li>
                <li className="text-(--accent) font-medium italic">
                  • Gemini (AI Pair Programming)
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="flex items-center gap-2 text-[#0000FF] dark:text-[#569CD6] mb-6 opacity-50">
            <span className="text-xl">##</span>
            <span className="text-xs font-bold tracking-widest">
              SYSTEM_ARCHITECTURE.json
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-(--vsc-tab) p-8 rounded-lg border border-(--vsc-border)">
            {[
              {
                label: 'Hybrid CMS',
                desc: 'Notion API를 활용한 콘텐츠 관리와 Markdown 기반의 렌더링을 결합했습니다. 익숙한 도구로 글을 쓰고, 최적화된 화면으로 보여줍니다.',
              },
              {
                label: 'Realtime Interaction',
                desc: 'Supabase Realtime을 사용하여 방명록과 댓글 기능을 구축했습니다. 정적 페이지 내에서도 실시간 소통이 가능하도록 설계했습니다.',
              },
              {
                label: 'Type Safety',
                desc: '전체 프로젝트에 TypeScript를 적용하여 컴파일 단계에서 에러를 방지하고, 유지보수가 용이한 코드 구조를 지향합니다.',
              },
              {
                label: 'Performace',
                desc: 'Next.js의 ISR(Incremental Static Regeneration)을 적용하여 서버 부하를 줄이면서도 최신 콘텐츠를 빠르게 서빙합니다.',
              },
            ].map((item) => (
              <div key={item.label} className="group">
                <h3 className="font-bold text-[#DCDCAA] text-sm flex items-center gap-2 mb-2">
                  <span className="text-[#CE9178]">"</span>
                  {item.label}
                  <span className="text-[#CE9178]">"</span>:
                </h3>
                <p className="text-[13px] opacity-60 leading-relaxed pl-4 border-l border-(--vsc-border) group-hover:border-(--accent) transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-32 py-12 border-t border-(--vsc-border) text-center">
          <p className="text-sm opacity-40 italic mb-8">
            "Keep pushing, keep coding."
          </p>
          <div className="opacity-20 text-[10px] tracking-[0.5em] uppercase">
            EOF (End of File)
          </div>
        </div>
      </div>
    </div>
  );
}
