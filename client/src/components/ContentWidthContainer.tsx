import "../styles/ContentWidthContainer.scss";

function ContentWidthContainer(props: any) {
    return <div className="content-width-container">{props.children}</div>;
}

export default ContentWidthContainer;
