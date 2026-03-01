import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NewSourceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NewSourceModal: React.FC<NewSourceModalProps> = ({ isOpen, onClose }) => {
  const [sourceName, setSourceName] = useState("");

  useEffect(() => {
    if (isOpen) setSourceName("");
  }, [isOpen]);

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
    if (!sourceName.trim()) return;
    onClose();
    // TODO: persist new source (e.g. callback or context)
  };

  const canSave = sourceName.trim().length > 0;

  if (!isOpen) return null;

  const modalContent = (
    <div className="ReactModalPortal ReactModalPortal-source" aria-modal="true" role="dialog">
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
          id="new_source_modal"
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-newsource open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-source-title"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxHeight: "90vh",
            width: "100%",
            maxWidth: "400px",
            background: "var(--bg-body, #fff)",
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
          }}
        >
          <div className="modal__container">
            <div className="header-modal">
              <h3 id="new-source-title" className="header-modal__label">New Source</h3>
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
              <label className="txt-label" htmlFor="new-source-name">
                Source Name
              </label>
              <input
                id="new-source-name"
                type="text"
                className="field-input"
                placeholder="Source Name"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
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
