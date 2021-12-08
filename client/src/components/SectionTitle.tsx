import "../styles/SectionTitle.scss";

interface SectionTitle {
    title: any;
}

function SectionTitle({ title }: SectionTitle) {
    return <h1 className="section-title">{title}</h1>;
}

export default SectionTitle;
