function makeStandardTimeString(time: number) {
    const timeObject = new Date(time);

    const day: number = timeObject.getDate();
    const month: string = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(timeObject);
    const year: number = timeObject.getFullYear();

    const timeString = `${day} ${month} ${year}`;

    return timeString;
}

export default makeStandardTimeString;
