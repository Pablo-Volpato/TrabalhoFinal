import React, { FC } from 'react';

import { ToastProvider } from './Toast';

const AppProvider: FC = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default AppProvider;
