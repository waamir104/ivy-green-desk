import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { EditPaymentMethodModal, type PaymentMethodForEdit } from "../components/EditPaymentMethodModal";

type EditPaymentMethodModalContextValue = {
  openModal: (id: number, name: string) => void;
  closeModal: () => void;
  setOnSave: (callback: ((id: number, name: string) => void) | null) => void;
};

const EditPaymentMethodModalContext = createContext<EditPaymentMethodModalContextValue | null>(null);

export function useEditPaymentMethodModal() {
  const ctx = useContext(EditPaymentMethodModalContext);
  if (!ctx) {
    throw new Error("useEditPaymentMethodModal must be used within EditPaymentMethodModalProvider");
  }
  return ctx;
}

export function EditPaymentMethodModalProvider({ children }: { children: React.ReactNode }) {
  const [method, setMethod] = useState<PaymentMethodForEdit | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onSaveRef = useRef<((id: number, name: string) => void) | null>(null);

  const openModal = useCallback((id: number, name: string) => {
    setMethod({ id, name });
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setMethod(null);
  }, []);
  const setOnSave = useCallback((cb: ((id: number, name: string) => void) | null) => {
    onSaveRef.current = cb;
  }, []);

  const handleSave = useCallback(
    (id: number, name: string) => {
      onSaveRef.current?.(id, name);
      closeModal();
    },
    [closeModal]
  );

  return (
    <EditPaymentMethodModalContext.Provider value={{ openModal, closeModal, setOnSave }}>
      {children}
      <EditPaymentMethodModal method={method} isOpen={isOpen} onClose={closeModal} onSave={handleSave} />
    </EditPaymentMethodModalContext.Provider>
  );
}
