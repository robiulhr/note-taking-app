import { useEffect, useRef, useState } from 'react';

export const useOverflowCheck = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    const checkOverflow = () => {
      setIsOverflowing(
        container?.scrollHeight > container?.clientHeight || container?.scrollWidth > container?.clientWidth
      );
    };

    const resizeObserver = new ResizeObserver(checkOverflow);

    if (container) {
      resizeObserver.observe(container);
    }

    if (content) {
      resizeObserver.observe(content);
    }

    checkOverflow(); // Check overflow initially

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { containerRef, contentRef, isOverflowing };
};
