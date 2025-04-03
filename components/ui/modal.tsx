import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click target is a part of a dropdown/select menu (Radix UI portals them to the document.body)
      const isSelectDropdown = (e.target as Element)?.closest('[data-slot="select-content"]') ||
                              (e.target as Element)?.closest('[data-radix-popper-content-wrapper]');
      
      if (modalRef.current && 
          !modalRef.current.contains(e.target as Node) && 
          !isSelectDropdown) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-200">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-in zoom-in-95 duration-150"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal; 