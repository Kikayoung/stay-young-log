'use client';
import { createContext, useContext, useState } from 'react';

const AICopilotContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export const useGuestbook = () => useContext(AICopilotContext);

export function AICopilotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AICopilotContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </AICopilotContext.Provider>
  );
}
