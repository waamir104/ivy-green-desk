import React, { createContext, useContext, useState, useCallback } from "react";
import { EditLineItemModal } from "../components/EditLineItemModal";

export type LineItemForEdit = {
  id: number;
  name: string;
  description: string;
  tax1: string;
  tax2: string;
  cost: string;
};

type EditLineItemModalContextValue = {
  openModal: (item: LineItemForEdit) => void;
  closeModal: () => void;
};

const EditLineItemModalContext = createContext<EditLineItemModalContextValue | null>(null);

export function useEditLineItemModal() {
  const ctx = useContext(EditLineItemModalContext);
  if (!ctx) {
    throw new Error("useEditLineItemModal must be used within EditLineItemModalProvider");
  }
  return ctx;
}

export function EditLineItemModalProvider({ children }: { children: React.ReactNode }) {
  const [editingItem, setEditingItem] = useState<LineItemForEdit | null>(null);
  const openModal = useCallback((item: LineItemForEdit) => setEditingItem(item), []);
  const closeModal = useCallback(() => setEditingItem(null), []);

  return (
    <EditLineItemModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <EditLineItemModal item={editingItem} onClose={closeModal} />
    </EditLineItemModalContext.Provider>
  );
}
