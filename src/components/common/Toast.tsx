import { useEffect, useState } from 'react';
import Image from 'next/image';
import Portal from '@components/modal/Portal';
import { useToast } from '@providers/ToastProvider';

const ToastItem = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-[47px] left-1/2 z-[1000] flex w-fit translate-x-[-50%] select-none justify-center rounded bg-dark px-12 py-3 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-80' : 'opacity-0'
      }`}
    >
      <Image
        src={`/svg/toast_${type}.svg`}
        width={20}
        height={20}
        alt=""
        className="absolute left-4"
      />
      <p className="ml-3 whitespace-nowrap text-center text-[14px] text-white">
        {message}
      </p>
    </div>
  );
};

const Toast = () => {
  const { toasts } = useToast();

  return (
    <Portal>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </Portal>
  );
};

export default Toast;
