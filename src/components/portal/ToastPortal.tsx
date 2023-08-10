import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const ToastPortal = ({ children }: PropsWithChildren) => {
  if (typeof window === 'object') {
    const portalDiv = document.querySelector('#toast-root');
    if (!portalDiv) return null;

    return <>{createPortal(children, portalDiv)}</>;
  }

  return null;
};

export default ToastPortal;
