import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-100"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 p-6 rounded border-2 border-rose-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
