import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NewTagModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (name: string, type: string) => void;
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NewTagModal: React.FC<NewTagModalProps> = ({ isOpen, onClose, onSave }) => {
  const [tagName, setTagName] = useState("");
  const [tagType, setTagType] = useState("Customer");

  useEffect(() => {
    if (isOpen) {
      setTagName("");
      setTagType("Customer");
    }
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
    if (!tagName.trim()) return;
    onSave?.(tagName.trim(), tagType.trim() || "Customer");
    onClose();
  };

  const canSave = tagName.trim().length > 0;

  if (!isOpen) return null;

  const modalContent = (
    <div className="ReactModalPortal ReactModalPortal-tag" aria-modal="true" role="dialog">
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
          id="new_tag_modal"
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-newtag open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-tag-title"
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
              <h3 id="new-tag-title" className="header-modal__label">New Tag</h3>
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
              <label className="txt-label" htmlFor="new-tag-name">
                Tag Name
              </label>
              <input
                id="new-tag-name"
                type="text"
                className="field-input"
                placeholder="Tag Name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                autoFocus
              />
              <label className="txt-label" htmlFor="new-tag-type">
                Type
              </label>
              <input
                id="new-tag-type"
                type="text"
                className="field-input"
                placeholder="Type"
                value={tagType}
                onChange={(e) => setTagType(e.target.value)}
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
