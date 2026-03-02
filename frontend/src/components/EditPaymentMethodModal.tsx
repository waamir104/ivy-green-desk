import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type PaymentMethodForEdit = {
  id: number;
  name: string;
};

type EditPaymentMethodModalProps = {
  method: PaymentMethodForEdit | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (id: number, name: string) => void;
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EditPaymentMethodModal: React.FC<EditPaymentMethodModalProps> = ({ method, isOpen, onClose, onSave }) => {
  const [methodName, setMethodName] = useState("");

  useEffect(() => {
    if (method) setMethodName(method.name);
  }, [method]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    if (!method || !methodName.trim()) return;
    onSave?.(method.id, methodName.trim());
    onClose();
  };

  const canSave = method != null && methodName.trim().length > 0;

  if (!isOpen || !method) return null;

  const modalContent = (
    <div className="ReactModalPortal ReactModalPortal-edit-payment-method" aria-modal="true" role="dialog">
      <div
        className="ReactModal__Overlay ReactModal__Overlay--after-open"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          id="edit_payment_method_modal"
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-editmethod open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-method-title"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            height: "auto",
            maxHeight: "90vh",
            width: "100%",
            maxWidth: "400px",
            background: "var(--bg-body, #fff)",
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            overflowY: "auto",
          }}
        >
          <div className="modal__container">
            <div className="header-modal">
              <h3 id="edit-method-title" className="header-modal__label">Edit Method</h3>
              <button
                type="button"
                className="v2-btn-default --icon-lg --transparent"
                tabIndex={0}
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="body-modal">
              <label className="txt-label" htmlFor="edit-method-name">
                Method Name
              </label>
              <input
                id="edit-method-name"
                type="text"
                className="field-input"
                placeholder="Method Name"
                value={methodName}
                onChange={(e) => setMethodName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="footer-modal btn-close">
              <button type="button" className="v2-btn-default --transparent" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className={`v2-btn-main${canSave ? "" : " is-disable"}`}
                disabled={!canSave}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
