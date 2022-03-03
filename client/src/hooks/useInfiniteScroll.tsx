import { useEffect, useRef, useState } from "react";

function useInfiniteScroll(reachedTheEnd: boolean, loadMoreElements: any) {
    const [lastElement, setLastElement] = useState(null as any);

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreElements();
                }
            },
            { threshold: 0.7 }
        )
    );

    useEffect(() => {
        if (!reachedTheEnd && lastElement) {
            observer.current.observe(lastElement);
        }

        return () => {
            if (!reachedTheEnd && lastElement) {
                observer.current.unobserve(lastElement);
            }
        };
    }, [lastElement]);

    return setLastElement;
}

export default useInfiniteScroll;
