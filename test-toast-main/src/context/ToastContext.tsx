import React, { createContext, useState, useContext, useCallback } from "react";
import type { ReactNode } from "react"; // Добавьте этот импорт
import type { Toast, CreateToast } from "../types/types";
import { ToastItem } from "../components/ToastItem";

interface ToastContextType {
  addToast: (toast: CreateToast) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: CreateToast): string => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const duration = toast.duration || 3000;

    setToasts((prevToasts) => {
      const existingToast = prevToasts.find((t) => t.text === toast.text && t.type === toast.type);

      if (existingToast) {
        return prevToasts.map((t) => (t.id === existingToast.id ? { ...t, duration } : t));
      }

      const newToast: Toast = {
        id,
        text: toast.text,
        type: toast.type,
        duration,
      };

      return [...prevToasts, newToast];
    });

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context.addToast;
};
