interface StandardTimeTypes {
    time: number;
}

function StandardTime(props: StandardTimeTypes) {
    const time = new Date(props.time);

    const day: number = time.getDate();
    const month: string = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(time);
    const year: number = time.getFullYear();

    const timeString = `${day} ${month} ${year}`;

    return <span>{timeString}</span>;
}

export default StandardTime;
