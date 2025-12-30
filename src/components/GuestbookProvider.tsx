'use client';
import { createContext, useContext, useState } from 'react';

const GuestbookContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export const useGuestbook = () => useContext(GuestbookContext);

export function GuestbookProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <GuestbookContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </GuestbookContext.Provider>
  );
}
