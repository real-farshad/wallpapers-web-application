import "../styles/ContentContainer.scss";

function ContentContainer(props: any) {
    return <div className="content-container">{props.children}</div>;
}

export default ContentContainer;
