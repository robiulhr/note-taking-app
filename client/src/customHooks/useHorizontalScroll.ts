import { useRef, useEffect, WheelEvent, useState, MouseEvent, DragEvent, useCallback } from "react";

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState<number | undefined>();
  const [scrollLeft, setScrollLeft] = useState<number | undefined>();

  const onWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    elRef.current?.scrollTo({
      left: (elRef.current?.scrollLeft as number) + e.deltaY,
      behavior: "smooth",
    });
  }, []);

  const startDragging = useCallback((e: DragEvent) => {
    setMouseDown(true);
    setStartX(e.pageX - (elRef.current?.offsetLeft as number));
    setScrollLeft(elRef.current?.scrollLeft);
  }, []);

  const stopDragging = useCallback(() => {
    setMouseDown(false);
  }, []);

  const move = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!mouseDown || !elRef.current) {
        return;
      }
      const x = e.pageX - (elRef.current.offsetLeft as number);
      const scroll = x - (startX as number);
      elRef.current.scrollLeft = (scrollLeft as number) - scroll;
      console.log(elRef.current.scrollLeft, scrollLeft, scroll);
    },
    [mouseDown, startX, scrollLeft]
  );

  useEffect(() => {
    const el = elRef.current;

    if (el) {
      // Add the event listeners
      el.addEventListener("wheel", onWheel as unknown as EventListener);
      el.addEventListener("mousemove", move as unknown as EventListener);
      el.addEventListener("mousedown", startDragging as unknown as EventListener);
      el.addEventListener("mouseup", stopDragging);
      el.addEventListener("mouseleave", stopDragging);

      return () => {
        // Remove the event listeners in the cleanup function
        el.removeEventListener("wheel", onWheel as unknown as EventListener);
        el.removeEventListener("mousemove", move as unknown as EventListener);
        el.removeEventListener("mousedown", startDragging as unknown as EventListener);
        el.removeEventListener("mouseup", stopDragging);
        el.removeEventListener("mouseleave", stopDragging);
      };
    }
  }, [onWheel, move, startDragging, stopDragging]);

  return elRef;
}
