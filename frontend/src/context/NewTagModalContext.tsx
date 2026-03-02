import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { NewTagModal } from "../components/NewTagModal";

type NewTagModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
  setOnSave: (callback: ((name: string, type: string) => void) | null) => void;
};

const NewTagModalContext = createContext<NewTagModalContextValue | null>(null);

export function useNewTagModal() {
  const ctx = useContext(NewTagModalContext);
  if (!ctx) {
    throw new Error("useNewTagModal must be used within NewTagModalProvider");
  }
  return ctx;
}

export function NewTagModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const onSaveRef = useRef<((name: string, type: string) => void) | null>(null);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const setOnSave = useCallback((cb: ((name: string, type: string) => void) | null) => {
    onSaveRef.current = cb;
  }, []);

  const handleSave = useCallback(
    (name: string, type: string) => {
      onSaveRef.current?.(name, type);
      closeModal();
    },
    [closeModal]
  );

  return (
    <NewTagModalContext.Provider value={{ openModal, closeModal, setOnSave }}>
      {children}
      <NewTagModal isOpen={isOpen} onClose={closeModal} onSave={handleSave} />
    </NewTagModalContext.Provider>
  );
}
