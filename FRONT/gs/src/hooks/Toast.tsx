import React, { createContext, FC, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from "../components/ToastContainer";

export interface ToastMessages {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast: (message: Omit<ToastMessages, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessages[]>([]);

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessages, 'id'>) => {
    const id = uuid();
    const toast = {
      id,
      type,
      title,
      description,
    };
    window.scrollTo(0, 0);
    setMessages((prevMessages) => [...prevMessages, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used whitin a ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
