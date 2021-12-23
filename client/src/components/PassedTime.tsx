interface PassedTimeTypes {
    time: number;
}

function PassedTime({ time }: PassedTimeTypes) {
    const passedTime = Date.now() - time;

    const minuteInMs = 60 * 1000;
    const hourInMs = minuteInMs * 60;
    const dayInMs = hourInMs * 24;
    const weekInMs = dayInMs * 7;
    const monthInMs = dayInMs * 30;
    const yearInMs = dayInMs * 365;

    let timeString;

    if (passedTime < minuteInMs) {
        timeString = "a few seconds";
    } else if (passedTime < hourInMs) {
        timeString = `${Math.floor(passedTime / minuteInMs)} minutes`;
    } else if (passedTime < dayInMs) {
        timeString = `${Math.floor(passedTime / hourInMs)} hours`;
    } else if (passedTime < weekInMs) {
        timeString = `${Math.floor(passedTime / dayInMs)} days`;
    } else if (passedTime < monthInMs) {
        timeString = `${Math.floor(passedTime / weekInMs)} weeks`;
    } else if (passedTime < yearInMs) {
        timeString = `${Math.floor(passedTime / monthInMs)} months`;
    } else {
        timeString = `${Math.floor(passedTime / yearInMs)} years`;
    }

    return <span>{timeString} ago</span>;
}

export default PassedTime;
