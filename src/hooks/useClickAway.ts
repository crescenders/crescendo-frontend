import { useEffect, useRef } from 'react';

const useClickAway = <T extends HTMLElement>(eventHandler: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        eventHandler();
      }
    };
    document.addEventListener('click', handleClickAway, true);

    return () => {
      document.removeEventListener('click', handleClickAway, true);
    };
  }, [eventHandler, ref]);

  return ref;
};

export default useClickAway;
