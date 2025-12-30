'use client';

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import MyCursor from '@/components/MyCursor';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { AICopilotProvider } from '@/components/AIChat/AICopilotProvider';
import AICopilotTrigger from '@/components/AIChat/AICopilotTrigger';
import AICopilotModal from '@/components/AIChat/AICopilotModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const TABS = [
    { name: 'Home.tsx', path: '/', icon: 'tsx', color: '#007ACC' },
    { name: 'Blog.mdx', path: '/blog', icon: 'mdx', color: '#4EC9B0' },
    {
      name: 'GuestBook.log',
      path: '/guestbook',
      icon: 'log',
      color: '#DCDCAA',
    },
    { name: 'README.md', path: '/about', icon: 'M↓', color: '#E37933' },
  ];

  const activeFile = TABS.find((tab) =>
    tab.path === '/' ? pathname === '/' : pathname.startsWith(tab.path),
  ) || { name: 'Untitled', icon: '??', color: '#858585' };

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen bg-(--background) text-(--foreground) transition-colors duration-300 font-mono h-screen">
        <ThemeProvider>
          {/* <MyCursor /> */}
          <AICopilotProvider>
            <header className="fixed top-0 z-50 w-full bg-(--vsc-tab) border-b border-(--vsc-border) backdrop-blur-md">
              <nav className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between relative">
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="text-sm font-bold tracking-tight flex items-center gap-2"
                  >
                    <span className="text-[#233847] dark:text-[#3794FF]">
                      ●
                    </span>
                    YOUNG.
                    <span className="opacity-40 font-normal hidden md:inline">
                      - Visual Studio Code
                    </span>
                  </Link>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md hidden lg:block px-4">
                  <div className="relative group">
                    {/* 돋보기 아이콘 (SVG) */}
                    <div className="absolute left-25 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>

                    {/* 검색창 Input */}
                    <input
                      type="text"
                      placeholder="Search Young Log (Ctrl + P)"
                      className="w-full bg-(--background) border border-(--vsc-border) rounded pl-8 pr-4 py-1 text-[11px] opacity-40 focus:opacity-100 focus:border-(--accent) outline-none transition-all text-center"
                      readOnly
                    />
                  </div>
                </div>

                {/* 3. 오른쪽: 테마 토글 */}
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
              </nav>
            </header>

            <main className="flex-1 flex pt-12 overflow-hidden justify-center items-center">
              <div className="w-full h-full border-y border-(--vsc-border) bg-(--background) flex flex-row overflow-hidden mx-auto ">
                <aside className="w-12 shrink-0 bg-(--vsc-tab) border-r border-(--vsc-border) flex flex-col items-center py-4 gap-4 hidden lg:flex">
                  {['explorer', 'search', 'extensions'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => ''}
                      className={
                        'p-2 transition-all relative opacity-40 hover:opacity-80'
                      }
                    >
                      {tab === 'explorer' && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                        </svg>
                      )}
                      {tab === 'search' && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                      )}
                      {tab === 'extensions' && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2L2 11h1.5c1.1 0 2 .9 2 2s-.9 2-2 2H2v4c0 1.1.9 2 2 2h4v-1.5c0-1.1.9-2 2-2s2 .9 2 2V21h4c1.1 0 2-.9 2-2v-4h1.5c1.1 0 2-.9 2-2s-.9-2-2-2z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </aside>

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
                  <div className="flex bg-(--vsc-tab) border-b border-(--vsc-border) overflow-x-auto scrollbar-hide shrink-0 sticky top-0 z-40">
                    {TABS.map((tab) => {
                      const isActive =
                        tab.path === '/'
                          ? pathname === '/'
                          : pathname.startsWith(tab.path);
                      return (
                        <Link
                          key={tab.path}
                          href={tab.path}
                          className={`
                        flex items-center gap-2 px-4 py-2 border-r border-(--vsc-border) min-w-fit transition-all group
                        ${
                          isActive
                            ? 'bg-(--background) border-t-2 opacity-100'
                            : 'bg-(--vsc-tab) opacity-50 hover:opacity-80 hover:bg-(--background)/50'
                        }
                      `}
                          style={{
                            borderTopColor: isActive
                              ? tab.color
                              : 'transparent',
                          }}
                        >
                          <span
                            style={{ color: tab.color }}
                            className="text-xs font-bold"
                          >
                            {tab.icon}
                          </span>
                          <span className="text-sm font-medium">
                            {tab.name}
                          </span>
                          <span
                            className={`text-[10px] ml-2 transition-opacity ${
                              isActive
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-40'
                            }`}
                          >
                            ×
                          </span>
                        </Link>
                      );
                    })}
                    <div className="grow bg-(--vsc-tab) border-b border-(--vsc-border)" />
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 relative">
                    {children}
                  </div>
                </div>
              </div>
            </main>
            <AICopilotTrigger />
            <AICopilotModal />
            <footer className="bg-[#007ACC] text-white py-1 px-4 text-[11px] font-medium flex justify-between items-center fixed bottom-0 w-full z-50">
              <div className="flex items-center space-x-4">
                <span className="hover:bg-white/10 px-2 cursor-pointer">
                  main*
                </span>
                <span className="hover:bg-white/10 px-2 cursor-pointer">
                  0 △ 0 ⊗
                </span>
              </div>
              <div className="flex items-center space-x-4 italic opacity-80">
                <span>UTF-8</span>
                <span>
                  {activeFile.name.split('.').pop()?.toUpperCase()} JSX
                </span>
                <span className="bg-white/20 px-2">Prettier</span>
              </div>
            </footer>
          </AICopilotProvider>
          <div className="h-6"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
