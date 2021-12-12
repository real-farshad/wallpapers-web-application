import "../styles/SectionTitle.scss";

interface SectionTitleTypes {
    title: any;
}

function SectionTitle({ title }: SectionTitleTypes) {
    return <h1 className="section-title">{title}</h1>;
}

export default SectionTitle;
