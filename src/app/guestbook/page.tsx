'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import GuestbookInput from '@/components/GuestbookInput';

export default function GuestBook() {
  const [logs, setLogs] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    setMounted(true);
    fetchLogs(10);
  }, []);

  useEffect(() => {
    if (scrollRef.current && isFirstLoad.current && logs.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      isFirstLoad.current = false;
    }
  }, [logs]);

  const fetchLogs = async (currentLimit: number) => {
    const { data, count, error } = await supabase
      .from('guestbook')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(currentLimit);

    if (error) {
      console.error('Error fetching logs:', error);
      return;
    }

    if (data) {
      // 시간순(과거->최신)
      const sortedLogs = [...data].reverse();
      setLogs(sortedLogs);
      if (count !== null) setTotalCount(count);
    }
  };

  const handleLoadMore = () => {
    const nextLimit = limit + 5;
    setLimit(nextLimit);
    fetchLogs(nextLimit);
  };

  const hasMore = totalCount > logs.length;
  return (
    <div className="w-full min-h-screen bg-(--background) font-mono flex flex-col transition-colors duration-300">
      <div className="flex items-center border-b border-(--vsc-border)/40 bg-(--vsc-tab-empty) shrink-0 h-10">
        <div className="flex items-center gap-2 px-4 h-full bg-(--background) border-t-2 border-(--accent) text-[11px] text-(--foreground)">
          <span className="text-[#6A9955] dark:text-[#B5CEA8] font-bold">
            LOG
          </span>
          <span className="opacity-90 font-medium">guestbook.log</span>
          <span className="ml-1 opacity-40 text-[10px]">src/database</span>
        </div>

        <div className="flex-1 flex items-center justify-end px-4 gap-4 text-[10px] text-(--foreground) opacity-40 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6A9955] animate-pulse" />
            Connected
          </span>
          <span>Total: {totalCount}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-8 py-8">
        {/* 시스템 헤더 */}
        <div className="mb-6 space-y-1 border-l-2 border-(--accent) pl-4 shrink-0">
          <p className="text-(--accent) text-[12px] font-bold uppercase">
            [SYSTEM] STREAMING...
          </p>
          <p className="text-(--foreground) opacity-30 text-[10px]">
            Timestamp: {mounted ? new Date().toISOString() : 'Loading...'}
          </p>
        </div>

        {/* 더보기 버튼 */}
        {hasMore && (
          <div
            className="flex items-center gap-4 py-2 group cursor-pointer mb-2 shrink-0"
            onClick={handleLoadMore}
          >
            <span className="text-[10px] opacity-20 bg-(--vsc-border)/30 px-2 rounded ml-2.5 sm:ml-35">
              ... Load More
            </span>
          </div>
        )}

        <div className="space-y-0.5">
          {logs.map((log) => (
            <div
              key={log.id}
              className="group flex flex-col sm:flex-row gap-1 sm:gap-4 py-1 px-2 hover:bg-(--vsc-border)/10 rounded-sm"
            >
              <span className="shrink-0 text-(--foreground) opacity-20 text-[11px] min-w-35">
                [
                {new Date(log.created_at).toLocaleTimeString([], {
                  hour12: false,
                })}
                ]
              </span>
              <div className="text-[13px] flex gap-2">
                <span className="text-[#007ACC] dark:text-[#569CD6] font-bold opacity-70 shrink-0">
                  [INFO]
                </span>
                <span className="text-[#058b71] dark:text-[#4EC9B0] font-bold whitespace-nowrap shrink-0">
                  @{String(log.id % 100).padStart(2, '0')}
                </span>
                <span className="text-(--foreground) opacity-80 break-all whitespace-pre-wrap">
                  {log.content}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-12 border-t border-(--vsc-border)/10 pt-6">
          <div className="flex items-center gap-2 mb-2 opacity-30 text-[10px] ml-1">
            <span className="text-(--accent) animate-pulse text-[8px]">❯</span>
            <span className="italic uppercase tracking-tighter text-[9px]">
              Append to EOF
            </span>
          </div>

          <div className="bg-(--vsc-tab)/30 border border-(--vsc-border)/30 rounded-sm p-0.5 focus-within:border-(--accent)/40 transition-all">
            <GuestbookInput onCreated={() => fetchLogs(limit)} />
          </div>

          <div className="mt-2 flex justify-between items-center opacity-10 text-[8px] font-mono pr-1 uppercase tracking-tighter">
            <span>{totalCount} Lines Recorded</span>
            <span>UTF-8 / Markdown</span>
          </div>
        </div>
      </div>
    </div>
  );
}
