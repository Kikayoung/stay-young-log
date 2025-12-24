export default function Home() {
  return (
    <div className="py-12 animate-fade-in">
      <h1 className="text-5xl font-bold mb-6">안녕하세요, 스테이영입니다.</h1>
      <p className="text-xl text-gray-600 leading-relaxed mb-8">
        기록을 통해 꾸준히 성장해 나가고자 합니다.
        <br />
        저는 프론트엔드 개발자이며, React, TypeScript 등을 주로 다룹니다.
      </p>

      <div className="flex gap-4">
        <a
          href="https://github.com/kikayoung"
          className="px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-all"
        >
          Github
        </a>
        {/* <a
          href="https://linkedin.com/..."// 링크드인 없음ㅜㅜ
          className="px-5 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all"
        >
          LinkedIn
        </a> */}
        <a
          href="mailto:kayoung7189@naver.com"
          className="px-5 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all"
        >
          Email
        </a>
      </div>
    </div>
  );
}
