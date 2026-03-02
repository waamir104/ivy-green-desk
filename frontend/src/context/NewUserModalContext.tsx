import React, { createContext, useContext, useState, useCallback } from "react";
import { NewUserModal } from "../components/NewUserModal";

type NewUserModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const NewUserModalContext = createContext<NewUserModalContextValue | null>(null);

export function useNewUserModal() {
  const ctx = useContext(NewUserModalContext);
  if (!ctx) {
    throw new Error("useNewUserModal must be used within NewUserModalProvider");
  }
  return ctx;
}

export function NewUserModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleSave = useCallback((_data: Record<string, string>) => {
    // TODO: persist new user
  }, []);

  return (
    <NewUserModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <NewUserModal isOpen={isOpen} onClose={closeModal} onSave={handleSave} />
    </NewUserModalContext.Provider>
  );
}
