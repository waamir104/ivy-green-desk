import React, { createContext, useContext, useState, useCallback } from "react";
import { NewScheduleModal, type NewScheduleFormData } from "../components/NewScheduleModal";

type NewScheduleModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const NewScheduleModalContext = createContext<NewScheduleModalContextValue | null>(null);

export function useNewScheduleModal() {
  const ctx = useContext(NewScheduleModalContext);
  if (!ctx) {
    throw new Error("useNewScheduleModal must be used within NewScheduleModalProvider");
  }
  return ctx;
}

export function NewScheduleModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleSave = useCallback((_data: NewScheduleFormData) => {
    // TODO: persist new schedule
  }, []);

  return (
    <NewScheduleModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <NewScheduleModal isOpen={isOpen} onClose={closeModal} onSave={handleSave} />
    </NewScheduleModalContext.Provider>
  );
}
