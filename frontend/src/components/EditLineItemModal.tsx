import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { LineItemForEdit } from "../context/EditLineItemModalContext";

type EditLineItemModalProps = {
  item: LineItemForEdit | null;
  onClose: () => void;
};

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 6.5L6.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 6.5L17.5 17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TAX_OPTIONS = ["", "Sales Tax", "VAT", "GST"];

export const EditLineItemModal: React.FC<EditLineItemModalProps> = ({ item, onClose }) => {
  const isOpen = item !== null;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("0");
  const [tax1, setTax1] = useState("");
  const [tax2, setTax2] = useState("");
  const [openDropdown, setOpenDropdown] = useState<"tax1" | "tax2" | null>(null);
  const tax1Ref = useRef<HTMLDivElement>(null);
  const tax2Ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const canSave = name.trim().length > 0;

  useEffect(() => {
    if (isOpen && item) {
      setName(item.name);
      setCost(item.cost.replace(/^\$/, "") || "0");
      setTax1(item.tax1 || "");
      setTax2(item.tax2 || "");
      setDescription(item.description || "");
      const t = setTimeout(() => {
        if (editorRef.current) editorRef.current.innerHTML = item.description || "";
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isOpen, item]);

  useEffect(() => {
    if (!isOpen) {
      setOpenDropdown(null);
    }
  }, [isOpen]);

  const applyFormat = (command: "bold" | "italic" | "underline") => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    document.execCommand(command, false);
    setDescription(el.innerHTML);
  };

  const handleEditorInput = () => {
    if (editorRef.current) setDescription(editorRef.current.innerHTML);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openDropdown) setOpenDropdown(null);
        else onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, openDropdown]);

  useEffect(() => {
    if (openDropdown === null) return;
    const ref = openDropdown === "tax1" ? tax1Ref : tax2Ref;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="ReactModalPortal ReactModalPortal-lineitem" aria-modal="true" role="dialog">
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
          className="ReactModal__Content ReactModal__Content--after-open modal container-modal modal-newlineitem open"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal__container large">
            <div className="header-modal">
              <h3 className="header-modal__label">Edit Item</h3>
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

            <div className="body-modal scrolls">
              <div className="row">
                <div className="has-form">
                  <span className="txt">Name</span>
                  <div>
                    <input
                      className="field-input"
                      placeholder="Name"
                      type="text"
                      name="name"
                      spellCheck
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <span className="txt">Description</span>
                <div className="wrap-content">
                  <div className="wrapbox-editor">
                    <div className="wrapbox-editor__form">
                      <div
                        ref={editorRef}
                        className="content-editable field-textarea --no-resize --no-border"
                        contentEditable
                        spellCheck
                        data-placeholder="Description"
                        role="textbox"
                        aria-label="Description"
                        onInput={handleEditorInput}
                        onPaste={handleEditorInput}
                      />
                    </div>
                    <div className="wrapbox-editor__controls">
                      <div className="editor-controls">
                        <span
                          className="editor-controls__btn tooltip"
                          title="Bold (CTRL+B)"
                          role="button"
                          tabIndex={0}
                          onMouseDown={(e) => { e.preventDefault(); applyFormat("bold"); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); applyFormat("bold"); } }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5 18.5C14.7091 18.5 16.5 17.9672 16.5 15C16.5 12.0346 14.7091 11.5 12.5 11.5C8.80101 11.5 8.5 10.5 8.5 15C8.5 18.5699 8.50456 18.5 12.5 18.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.5 11.5C13.1568 11.5 14.4999 11.0433 14.4999 8.5C14.4999 5.9582 13.1568 5.5 11.5 5.5C8.38294 5.5 8.49996 5.25994 8.49996 8.5C8.49996 12.4196 8.45647 11.5 11.5 11.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.49854 5.5V18.5L11.5 18.4994H8.49854V5.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span
                          className="editor-controls__btn tooltip"
                          title="Italic (CTRL+I)"
                          role="button"
                          tabIndex={0}
                          onMouseDown={(e) => { e.preventDefault(); applyFormat("italic"); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); applyFormat("italic"); } }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.8305 18.4996L13.5 18.4994H7.5L8.78242 18.4997C9.76971 18.4999 10.6094 17.7796 10.7595 16.8038L12.1441 7.80411C12.3121 6.71239 11.5632 5.69121 10.4715 5.52326C10.3708 5.50777 10.2692 5.5 10.1674 5.5H9.5H15.5H14.2157C13.2286 5.5 12.3891 6.22011 12.2389 7.19568L10.8534 16.1952C10.6853 17.2869 11.4341 18.3082 12.5258 18.4763C12.6266 18.4918 12.7285 18.4996 12.8305 18.4996Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span
                          className="editor-controls__btn tooltip"
                          title="Underline (CTRL+U)"
                          role="button"
                          tabIndex={0}
                          onMouseDown={(e) => { e.preventDefault(); applyFormat("underline"); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); applyFormat("underline"); } }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 18.5H18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 5.5V11C7.5 13.4853 9.51472 15.5 12 15.5C14.4853 15.5 16.5 13.4853 16.5 11V5.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <div className="editor-controls --action" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-multi">
                <div className="col">
                  <span className="txt">Cost</span>
                  <div>
                    <div className="cost-input --right" data-currency-unit="$">
                      <input
                        className="field-input"
                        placeholder="Cost"
                        type="number"
                        name="cost"
                        spellCheck
                        step="0.01"
                        min="0"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col" ref={tax1Ref}>
                  <span className="txt">Tax 1</span>
                  <div className={`v2-dropup v2-dropdown${openDropdown === "tax1" ? " is-open" : ""}`}>
                    <button type="button" className="dropbtn items" onClick={() => setOpenDropdown((k) => (k === "tax1" ? null : "tax1"))}>
                      <span className="txt-ellipsis">{tax1 || "Select tax"}</span>
                      <span className="arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.5 7.5L8 11L11.5 7.5" stroke="var(--color-icon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <div className="v2-dropdown__menu content-full scrolls">
                      <ul>
                        {TAX_OPTIONS.map((opt) => (
                          <li key={opt || "none"} className={`items${tax1 === opt ? " active" : ""}`} title={opt || ""} onClick={() => { setTax1(opt); setOpenDropdown(null); }}>
                            <div className="txt-ellipsis">{opt || "—"}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col" ref={tax2Ref}>
                  <span className="txt">Tax 2</span>
                  <div className={`v2-dropup v2-dropdown${openDropdown === "tax2" ? " is-open" : ""}`}>
                    <button type="button" className="dropbtn items" onClick={() => setOpenDropdown((k) => (k === "tax2" ? null : "tax2"))}>
                      <span className="txt-ellipsis">{tax2 || "Select tax"}</span>
                      <span className="arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.5 7.5L8 11L11.5 7.5" stroke="var(--color-icon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <div className="v2-dropdown__menu content-full scrolls">
                      <ul>
                        {TAX_OPTIONS.map((opt) => (
                          <li key={opt || "none"} className={`items${tax2 === opt ? " active" : ""}`} title={opt || ""} onClick={() => { setTax2(opt); setOpenDropdown(null); }}>
                            <div className="txt-ellipsis">{opt || "—"}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-modal btn-close">
              <button type="button" className="v2-btn-default --transparent ml-n2" onClick={onClose}>Cancel</button>
              <button type="button" className={`v2-btn-main${canSave ? "" : " is-disable"}`} disabled={!canSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
