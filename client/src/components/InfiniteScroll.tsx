import { Fragment, useCallback, useEffect, useState, cloneElement } from "react";

interface InfiniteScrollTypes {
    elements: {
        _id: string;
    }[];
    elementsFinished: boolean;
    loadMoreElements: () => void;
    template: any;
}

function InfiniteScroll(props: InfiniteScrollTypes) {
    const { elements, elementsFinished, loadMoreElements, template } = props;

    const [reachedBottom, setReachedBottom] = useState(false);

    useEffect(() => {
        if (reachedBottom) {
            loadMoreElements();
            setReachedBottom(false);
        }
    }, [reachedBottom]);

    const lastElementRef = useCallback((lastElement) => {
        if (lastElement !== null) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            observer.unobserve(lastElement as any);
                            setReachedBottom(true);
                        }
                    });
                },
                { threshold: 0.7 }
            );
            observer.observe(lastElement as any);
        }
    }, []);

    return (
        <Fragment>
            {elements.length > 0 &&
                elements.map((element, elementIndex) => {
                    const isLastElement = elementIndex === elements.length - 1;
                    const observe = isLastElement && !elementsFinished;
                    return observe ? (
                        <div ref={lastElementRef} key={element._id}>
                            {cloneElement(template, { data: element })}
                        </div>
                    ) : (
                        <div key={element._id}>
                            {cloneElement(template, { data: element })}
                        </div>
                    );
                })}
        </Fragment>
    );
}

export default InfiniteScroll;
