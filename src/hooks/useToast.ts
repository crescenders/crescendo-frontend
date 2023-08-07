import { ToastMessageType, toastMessageState } from '@recoil/toast';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const useToast = () => {
  const setToasts = useSetRecoilState(toastMessageState);

  const hideToast = useCallback(
    (toastId: number) => {
      setToasts((current) => current.filter((toast) => toast.id !== toastId));
    },
    [setToasts],
  );

  const showToast = useCallback(
    (toast: ToastMessageType) => {
      const toastId = new Date().getTime();

      setToasts((current) => [...current, { ...toast, id: toastId }]);
      setTimeout(() => hideToast(toastId), 1000);
    },
    [setToasts, hideToast],
  );

  return { showToast };
};

export default useToast;
