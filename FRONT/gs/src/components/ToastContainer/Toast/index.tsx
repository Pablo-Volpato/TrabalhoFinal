import React, { FC, useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { CSSProperties } from 'styled-components';
import Container from './styles';
import { ToastMessages, useToast } from '../../../hooks/Toast';

interface ToastProps {
  message: ToastMessages;
  style: CSSProperties;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container hasDescription={!!message.description} type={message.type} style={style}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
