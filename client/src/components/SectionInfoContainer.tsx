import "../styles/SectionInfoContainer.scss";

interface SectionInfoContainerTypes {
    twoRows?: boolean;
    children: any;
}

function SectionInfoContainer(props: SectionInfoContainerTypes) {
    const { twoRows, children } = props;

    return (
        <div
            className={`section-info-container${
                twoRows ? " section-info-container--two-rows" : ""
            }`}
        >
            {children}
        </div>
    );
}

export default SectionInfoContainer;
