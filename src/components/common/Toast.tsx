import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { toastMessageState } from '@recoil/toast';

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
      className={`fixed bottom-[47px] flex w-[280px] select-none rounded bg-dark px-4 py-3 transition-all duration-500 ease-in-out ${
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
      <p className="w-full text-center text-[14px] text-white">{message}</p>
    </div>
  );
};

const Toast = () => {
  const toasts = useRecoilValue(toastMessageState);

  return (
    <>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </>
  );
};

export default Toast;
