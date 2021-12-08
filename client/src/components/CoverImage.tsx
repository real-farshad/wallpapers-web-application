import "../styles/CoverImage.scss";

interface CoverImageTypes {
    src: string;
}

function CoverImage({ src }: CoverImageTypes) {
    return (
        <div
            className="cover-image"
            style={{
                backgroundImage: `url(${src})`,
            }}
        />
    );
}

export default CoverImage;
