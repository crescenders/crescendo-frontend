import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ToastContextValue = {
  toasts: ToastMessageType[];
  showToast: (toast: ToastMessageType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastMessageType = {
  id?: number;
  type: 'success' | 'fail';
  message: string;
};

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastMessageType[]>([]);

  const hideToast = (toastId: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const showToast = useCallback((toast: ToastMessageType) => {
    const toastId = new Date().getTime();

    setToasts((current) => [...current, { ...toast, id: toastId }]);

    setTimeout(() => hideToast(toastId), 1000);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      toasts,
      showToast,
    }),
    [toasts, showToast],
  );

  return (
    <ToastContext.Provider value={memoizedValue}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error('부모 트리에서 ToastProvider를 사용해주세요.');
  }

  const { toasts, showToast } = toastContext;

  return { toasts, showToast };
};
