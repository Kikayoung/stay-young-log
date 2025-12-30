'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface GuestbookInputProps {
  onCreated?: () => void;
}

export default function GuestbookInput({ onCreated }: GuestbookInputProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.from('guestbook').insert([{ content }]);

      if (error) throw error;

      setContent('');

      // 글 작성이 성공하면 부모가 준 함수(fetchLogs)를 실행!
      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      alert('로그 기록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="로그 메시지를 입력하세요... (Shift + Enter로 줄바꿈)"
        className="w-full bg-transparent border-none outline-none text-[13px] text-(--foreground) min-h-15 resize-none p-2"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
    </form>
  );
}
