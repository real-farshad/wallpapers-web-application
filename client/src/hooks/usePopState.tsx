import { useEffect } from "react";

export function usePopState(callback: () => void) {
  useEffect(() => {
    const handlePopState = () => {
      callback();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [callback]);
}
