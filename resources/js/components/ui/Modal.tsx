import { X } from "lucide-react";
import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  overlayClassName?: string;
  className?: string;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "w-full mx-6",
};

export const Modal: React.FC<ModalProps> = ({
  title='',
  size = "md",
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  overlayClassName = "",
  className = "",
}) => {
  // Close with ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Overlay click close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-secondary text-secondary-foreground rounded-lg shadow-lg overflow-auto w-full ${sizeMap[size]} ${className}`}
      >
        <ModalHeader onClose={onClose}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </div>
    </div>
  );
};

// Header
interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className = "",
  showCloseButton = true,
  onClose,
}) => {
  return (
    <div className={`flex justify-between items-center p-4 border-b ${className}`}>
      <h3 className="text-xl font-semibold">{children}</h3>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-accent-foreground text-2xl"
          aria-label="Close"
        >
          <X />
        </button>
      )}
    </div>
  );
};

// Body
interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}
export const ModalBody: React.FC<ModalBodyProps> = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Footer
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}
export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = "" }) => (
  <div className={`p-4 border-t flex justify-end space-x-2 ${className}`}>{children}</div>
);
