import React, { createContext, useContext, useState, useCallback } from "react";
import { EditUserModal } from "../components/EditUserModal";
import type { UserForEdit } from "../components/EditUserModal";

type EditUserModalContextValue = {
  openModal: (user: UserForEdit) => void;
  closeModal: () => void;
};

const EditUserModalContext = createContext<EditUserModalContextValue | null>(null);

export function useEditUserModal() {
  const ctx = useContext(EditUserModalContext);
  if (!ctx) {
    throw new Error("useEditUserModal must be used within EditUserModalProvider");
  }
  return ctx;
}

export function EditUserModalProvider({ children }: { children: React.ReactNode }) {
  const [userToEdit, setUserToEdit] = useState<UserForEdit | null>(null);
  const openModal = useCallback((user: UserForEdit) => setUserToEdit(user), []);
  const closeModal = useCallback(() => setUserToEdit(null), []);

  const handleSave = useCallback((_data: Partial<UserForEdit>) => {
    // TODO: persist user changes
  }, []);

  return (
    <EditUserModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <EditUserModal user={userToEdit} onClose={closeModal} onSave={handleSave} />
    </EditUserModalContext.Provider>
  );
}
