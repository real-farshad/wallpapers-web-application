function calculateElapsedTime(time: number) {
    const elapsedTime = Date.now() - time;

    const minuteInMs = 60 * 1000;
    const hourInMs = minuteInMs * 60;
    const dayInMs = hourInMs * 24;
    const weekInMs = dayInMs * 7;
    const monthInMs = dayInMs * 30;
    const yearInMs = dayInMs * 365;

    let timeString;

    if (elapsedTime < minuteInMs) {
        timeString = "a few seconds";
    } else if (elapsedTime < hourInMs) {
        const minuteCount = Math.floor(elapsedTime / minuteInMs);
        timeString = minuteCount + " minute";
        timeString += minuteCount > 1 ? "s" : "";
    } else if (elapsedTime < dayInMs) {
        const hourCount = Math.floor(elapsedTime / hourInMs);
        timeString = hourCount + " hour";
        timeString += hourCount > 1 ? "s" : "";
    } else if (elapsedTime < weekInMs) {
        const dayCount = Math.floor(elapsedTime / dayInMs);
        timeString = dayCount + " day";
        timeString += dayCount > 1 ? "s" : "";
    } else if (elapsedTime < monthInMs) {
        const weekCount = Math.floor(elapsedTime / weekInMs);
        timeString = weekCount + " week";
        timeString += weekCount > 1 ? "s" : "";
    } else if (elapsedTime < yearInMs) {
        const monthCount = Math.floor(elapsedTime / monthInMs);
        timeString = monthCount + " week";
        timeString += monthCount > 1 ? "s" : "";
    } else {
        const yearCount = Math.floor(elapsedTime / yearInMs);
        timeString = yearCount + " year";
        timeString += yearCount > 1 ? "s" : "";
    }

    return `${timeString} ago`;
}

export default calculateElapsedTime;
