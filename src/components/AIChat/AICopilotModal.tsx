'use client';

import { useGuestbook } from './AICopilotProvider';
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AICopilotModal() {
  const { isOpen, close } = useGuestbook();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'model'; text: string }[]
  >([
    {
      role: 'model',
      text: '안녕하세요! YOUNG-LOG AI입니다. 터미널 환경에서 무엇을 도와드릴까요?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤 로직
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Gemini 설정
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI
    ? genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    : null;

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: '[ERROR] API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.',
        },
      ]);
      return;
    }
    if (!input.trim() || isLoading || !model) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite',
        // https://generativelanguage.googleapis.com/v1beta/models?key=NEXT_PUBLIC_GEMINI_API_KEY
        // 해당 페이지에서 가능한 모델 사용
      });

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: response.text() },
      ]);
    } catch (error: any) {
      console.error('Gemini API Error:', error);

      let errorMessage = '[SYSTEM ERROR] 알 수 없는 오류가 발생했습니다.';

      if (
        error.message?.includes('429') ||
        error.message?.toLowerCase().includes('quota')
      ) {
        errorMessage = `[SYSTEM] 트래픽 초과: AI 코파일럿이 현재 너무 많은 요청을 처리하고 있습니다. [ACTION] 약 1분 후 다시 시도해 주세요. (Status: RESOURCE_EXHAUSTED)`;
      } else if (error.message?.includes('404')) {
        errorMessage =
          '[SYSTEM] 모델 경로를 찾을 수 없습니다. 설정(Config)을 확인해 주세요.';
      } else if (error.message?.includes('fetch')) {
        errorMessage =
          '[OFFLINE] 네트워크 연결이 불안정합니다. 연결 상태를 확인하세요.';
      }

      setMessages((prev) => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in font-mono">
      <div className="absolute inset-0" onClick={close} />

      <div className="w-full max-w-2xl bg-(--vsc-tab) border border-(--vsc-border) shadow-2xl rounded-lg overflow-hidden relative z-10 animate-zoom-in">
        <div className="px-4 py-2 bg-(--background) border-b border-(--vsc-border) flex items-center justify-between">
          <div className="flex gap-1.5 group">
            <div
              onClick={close}
              className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer flex items-center justify-center text-[10px] text-black/70 transition-all"
            >
              <span className="opacity-0 group-hover:opacity-100">✕</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] opacity-40 italic">
            ai-copilot.sh — 80x24
          </span>
        </div>

        <div className="p-8 text-left space-y-6">
          {/* 환경 정보 */}
          <div className="flex flex-wrap gap-2 text-[13px]">
            <span className="text-[#4EC9B0]">➔</span>
            <span className="text-[#569CD6]">~/stay-young-log</span>
            <span className="text-[#CE9178]">git:(main)</span>
            <span className="text-[#6A9955] animate-pulse ml-2">
              [AI_ONLINE]
            </span>
          </div>

          {/* 시스템 부팅 로그 */}
          <div className="space-y-1 text-[13px] border-b border-(--vsc-border)/30 pb-4">
            <p className="text-(--foreground) opacity-90">
              $ ./start_ai_agent.sh
            </p>
            <p className="text-[#DCDCAA]">
              [INFO] Initializing Gemini-1.5-flash engine...
            </p>
            <p className="text-[#6A9955]">
              [SUCCESS] Connection established with neural network.
            </p>
          </div>

          {/* 채팅 메시지 영역 */}
          <div
            ref={scrollRef}
            className="space-y-4 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2 py-2"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className="text-[13px] leading-relaxed flex gap-3 group"
              >
                <span className="text-[#4EC9B0] font-bold shrink-0">
                  {msg.role === 'model' ? '🤖 [AI]:' : '👤 [YOU]:'}
                </span>
                <span className="text-(--foreground) opacity-90 break-all whitespace-pre-wrap">
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 text-[13px]">
                <span className="text-[#4EC9B0] font-bold shrink-0">
                  🤖 [AI]:
                </span>
                <p className="text-[#DCDCAA] animate-pulse italic">
                  Thinking...
                </p>
              </div>
            )}
          </div>

          {/* 터미널 입력창 */}
          <div className="pt-4 border-t border-(--vsc-border)/50">
            <form
              onSubmit={handleChat}
              className="flex gap-2 items-center text-[13px]"
            >
              <span className="text-[#4EC9B0] font-bold">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="명령어를 입력하세요..."
                className="flex-1 bg-transparent outline-none text-(--foreground) placeholder:opacity-20"
                autoFocus
                disabled={isLoading}
              />
            </form>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <span className="text-[10px] opacity-20 italic">
              Press Enter to execute command
            </span>
          </div>
        </div>
      </div>

      {/* 배경 대형 텍스트 */}
      <h1 className="fixed bottom-10 -z-10 text-[10vw] font-black opacity-[0.03] select-none tracking-tighter whitespace-nowrap uppercase pointer-events-none">
        AI Intelligence
      </h1>
    </div>
  );
}
