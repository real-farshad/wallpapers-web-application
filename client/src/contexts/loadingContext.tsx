import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(null as any);

function LoadingProvider({ children }: any) {
    const [loading, setLoading] = useState(true);
    const [animation, setAnimation] = useState({
        firstStep: false,
        secondStep: false,
    });

    function startLoading() {
        setAnimation({ firstStep: false, secondStep: false });
        setLoading(true);
    }

    function finishLoading() {
        setAnimation((prevState) => ({
            ...prevState,
            firstStep: true,
        }));

        setTimeout(
            () =>
                setAnimation((prevState) => ({
                    ...prevState,
                    secondStep: true,
                })),
            300
        );

        setTimeout(() => setLoading(false), 1000);
    }

    return (
        <LoadingContext.Provider
            value={{
                loading,
                animation,
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
