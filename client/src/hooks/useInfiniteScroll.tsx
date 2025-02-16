/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

function useInfiniteScroll(setPage: any) {
  const [lastElement, setLastElement] = useState(null as any);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage: number) => prevPage + 1);
        }
      },
      { threshold: 0.7 }
    )
  );

  useEffect(() => {
    if (lastElement) {
      observer.current.observe(lastElement);
    }

    return () => {
      if (lastElement) {
        observer.current.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  return setLastElement;
}

export default useInfiniteScroll;
