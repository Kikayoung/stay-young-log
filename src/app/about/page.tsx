export default function About() {
  return (
    <div className="py-24 animate-fade-in max-w-2xl">
      <h1 className="text-3xl md:text-5xl font-black mb-10 tracking-tight leading-tight text-(--foreground)">
        안녕하세요, <br />
        <span className="text-(--accent)">가영(Young)</span>입니다.
      </h1>

      <div className="space-y-6 text-base md:text-lg text-(--foreground) opacity-80 leading-relaxed font-medium mb-12">
        <p>오늘의 나를 더 성장하게 만들어 나가는 과정을 좋아합니다.</p>
        <p className="opacity-60 text-sm md:text-base">
          React와 TypeScript를 주로 사용하는 프론트엔드 개발자입니다.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href="https://github.com/kikayoung"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-(--accent) text-(--background) rounded-full font-black hover:scale-105 transition-all shadow-lg shadow-(--accent)/20"
        >
          GITHUB
        </a>
        {/* <a
          href="https://linkedin.com/..."// 링크드인 없음ㅜㅜ
          className="px-5 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all"
        >
          LinkedIn
        </a> */}
        <a
          href="mailto:kayoung7189@naver.com"
          className="px-8 py-3 border-2 border-(--accent) text-(--accent) rounded-full font-black hover:bg-(--accent) hover:text-(--background) transition-all"
        >
          EMAIL
        </a>
      </div>

      <div className="mt-24 space-y-12">
        <h2 className="text-2xl font-black text-(--foreground) tracking-tighter">
          About This Blog <span className="text-(--accent)">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-(--accent) text-sm uppercase tracking-widest">
              Core
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Next.js 15와 TypeScript를 기반으로 제작되었으며, ISR 방식을 통해
              60초마다 노션의 새로운 데이터를 동기화합니다.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-(--accent) text-sm uppercase tracking-widest">
              Database
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Notion API를 CMS로 사용하여 효율적인 콘텐츠 관리가 가능하며,
              노션의 자유로운 편집 기능을 블로그에 그대로 담았습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-(--accent) text-sm uppercase tracking-widest">
              Comments
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              오픈소스 댓글 서비스인 Cusdis를 연동하여 사용자의 개인정보를
              보호하면서 자유로운 소통 공간을 마련했습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-(--accent) text-sm uppercase tracking-widest">
              Deployment
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Vercel을 통해 자동 배포 환경을 구축하였으며, 환경 변수(Env) 관리를
              통해 보안성을 높였습니다.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-32 border-t border-(--accent)/10 dark:border-white/10" />
    </div>
  );
}
