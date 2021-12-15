import SectionTitle from "./SectionTitle";
import "../styles/FlexSectionTitle.scss";

function FlexSectionTitle({ children }: any) {
    return (
        <div className="flex-section-title">
            <SectionTitle>{children}</SectionTitle>
        </div>
    );
}

export default FlexSectionTitle;
