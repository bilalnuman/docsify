import React, { type ReactNode, useEffect, useState, type MouseEvent } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  backdropBlur?: string;
  backdropOpacity?: string;
  /** When true, disable all user-initiated cancel actions (ESC, backdrop, X button) */
  noCancel?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  backdropBlur = "backdrop-blur-sm",
  backdropOpacity = "bg-black/40",
  noCancel = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimate(true), 10);
      return () => {
        document.body.style.overflow = prev;
      };
    } else {
      setAnimate(false);
      setTimeout(() => setIsMounted(false), 250);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || noCancel) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, noCancel, onClose]);

  if (!isMounted) return null;
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (noCancel) return;
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-out
        ${backdropBlur} ${backdropOpacity} ${animate ? "opacity-100" : "opacity-0"}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white dark:bg-[#3D3E43] rounded-xl shadow-lg p-6 w-full max-w-md mx-4 relative
          transform transition-all duration-300 ease-out
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          max-h-[95vh] overflow-y-auto overflow-visible`}
      >
        {!noCancel && (
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            <IoClose size={24} className="dark:text-white" />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
