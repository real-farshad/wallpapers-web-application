import "../styles/SectionInfoContainer.scss";

interface SectionInfoContainerTypes {
    controls?: boolean;
    children: any;
}

function SectionInfoContainer(props: SectionInfoContainerTypes) {
    const { controls, children } = props;

    return (
        <div
            className={`section-info-container${
                controls ? " section-info-container--two-rows" : ""
            }`}
        >
            {children}
        </div>
    );
}

export default SectionInfoContainer;
