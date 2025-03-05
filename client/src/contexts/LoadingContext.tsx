import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(null as any);

function LoadingProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [startCloseAnimation, setStartCloseAnimation] = useState(false);

  function startLoading() {
    setLoading(true);
  }

  function finishLoading() {
    setStartCloseAnimation(true);

    setTimeout(() => {
      setLoading(false);
      setStartCloseAnimation(false);
    }, 500);
  }

  return (
    <LoadingContext.Provider
      value={{
        loading,
        startCloseAnimation,
        startLoading,
        finishLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

function useLoadingContext() {
  return useContext(LoadingContext);
}

export default LoadingProvider;
export { useLoadingContext };
