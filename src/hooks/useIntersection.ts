import { useEffect, useRef, useState } from 'react';

/**
 * @description Intersection Observer API를 통해 구현된 커스텀 훅입니다.
 * @param options.root
 * @param options.rootMargin
 * @param options.threshold
 * @returns { targetRef, isIntersecting } 타켓 요소, 교차 여부
 */
const useIntersection = (options: IntersectionObserverInit = {}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (!targetRef.current) return;

    if (targetRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, options);

      observer.observe(targetRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [targetRef.current, options.threshold]);

  return { targetRef, isIntersecting };
};

export default useIntersection;
