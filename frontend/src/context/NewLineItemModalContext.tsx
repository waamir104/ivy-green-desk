import React, { createContext, useContext, useState, useCallback } from "react";
import { NewLineItemModal } from "../components/NewLineItemModal";

type NewLineItemModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const NewLineItemModalContext = createContext<NewLineItemModalContextValue | null>(null);

export function useNewLineItemModal() {
  const ctx = useContext(NewLineItemModalContext);
  if (!ctx) {
    throw new Error("useNewLineItemModal must be used within NewLineItemModalProvider");
  }
  return ctx;
}

export function NewLineItemModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <NewLineItemModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <NewLineItemModal isOpen={isOpen} onClose={closeModal} />
    </NewLineItemModalContext.Provider>
  );
}
