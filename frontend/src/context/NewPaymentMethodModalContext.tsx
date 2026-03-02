import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { NewPaymentMethodModal } from "../components/NewPaymentMethodModal";

type NewPaymentMethodModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
  setOnSave: (callback: ((name: string) => void) | null) => void;
};

const NewPaymentMethodModalContext = createContext<NewPaymentMethodModalContextValue | null>(null);

export function useNewPaymentMethodModal() {
  const ctx = useContext(NewPaymentMethodModalContext);
  if (!ctx) {
    throw new Error("useNewPaymentMethodModal must be used within NewPaymentMethodModalProvider");
  }
  return ctx;
}

export function NewPaymentMethodModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const onSaveRef = useRef<((name: string) => void) | null>(null);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const setOnSave = useCallback((cb: ((name: string) => void) | null) => {
    onSaveRef.current = cb;
  }, []);

  const handleSave = useCallback(
    (name: string) => {
      onSaveRef.current?.(name);
      closeModal();
    },
    [closeModal]
  );

  return (
    <NewPaymentMethodModalContext.Provider value={{ openModal, closeModal, setOnSave }}>
      {children}
      <NewPaymentMethodModal isOpen={isOpen} onClose={closeModal} onSave={handleSave} />
    </NewPaymentMethodModalContext.Provider>
  );
}
