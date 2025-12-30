'use client';
import { useGuestbook } from './GuestbookProvider';

export default function GuestbookTrigger() {
  const { open } = useGuestbook();

  return (
    <button
      onClick={open}
      className="fixed bottom-10 right-6 z-40 w-12 h-12 bg-[#007ACC] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all group"
    >
      <span className="text-xl">💬</span>
      {/* 툴팁 */}
      <span className="absolute right-14 px-2 py-1 bg-(--vsc-tab) border border-(--vsc-border) text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Open Guestbook
      </span>
    </button>
  );
}
