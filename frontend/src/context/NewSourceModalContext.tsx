import React, { createContext, useContext, useState, useCallback } from "react";
import { NewSourceModal } from "../components/NewSourceModal";

type NewSourceModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const NewSourceModalContext = createContext<NewSourceModalContextValue | null>(null);

export function useNewSourceModal() {
  const ctx = useContext(NewSourceModalContext);
  if (!ctx) {
    throw new Error("useNewSourceModal must be used within NewSourceModalProvider");
  }
  return ctx;
}

export function NewSourceModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <NewSourceModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <NewSourceModal isOpen={isOpen} onClose={closeModal} />
    </NewSourceModalContext.Provider>
  );
}
