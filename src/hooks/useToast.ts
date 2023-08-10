import { ToastMessageType, toastMessageState } from '@recoil/toast';
import { useSetRecoilState } from 'recoil';

const useToast = () => {
  const setToasts = useSetRecoilState(toastMessageState);

  const hideToast = (toastId: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const showToast = (toast: ToastMessageType) => {
    const toastId = new Date().getTime();

    setToasts((current) => [...current, { ...toast, id: toastId }]);
    setTimeout(() => hideToast(toastId), 1000);
  };

  return { showToast };
};

export default useToast;
