import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { EditTagModal, type TagForEdit } from "../components/EditTagModal";

type EditTagModalContextValue = {
  openModal: (tag: TagForEdit) => void;
  closeModal: () => void;
  setOnSave: (callback: ((id: number, name: string, type: string) => void) | null) => void;
};

const EditTagModalContext = createContext<EditTagModalContextValue | null>(null);

export function useEditTagModal() {
  const ctx = useContext(EditTagModalContext);
  if (!ctx) {
    throw new Error("useEditTagModal must be used within EditTagModalProvider");
  }
  return ctx;
}

export function EditTagModalProvider({ children }: { children: React.ReactNode }) {
  const [tag, setTag] = useState<TagForEdit | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onSaveRef = useRef<((id: number, name: string, type: string) => void) | null>(null);

  const openModal = useCallback((t: TagForEdit) => {
    setTag(t);
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTag(null);
  }, []);
  const setOnSave = useCallback((cb: ((id: number, name: string, type: string) => void) | null) => {
    onSaveRef.current = cb;
  }, []);

  const handleSave = useCallback(
    (id: number, name: string, type: string) => {
      onSaveRef.current?.(id, name, type);
      closeModal();
    },
    [closeModal]
  );

  return (
    <EditTagModalContext.Provider value={{ openModal, closeModal, setOnSave }}>
      {children}
      <EditTagModal tag={tag} isOpen={isOpen} onClose={closeModal} onSave={handleSave} />
    </EditTagModalContext.Provider>
  );
}
