function makeStandardCountString(count: number) {
    return count >= 1000 ? `${Math.floor(count / 100) / 10}k` : count;
}

export default makeStandardCountString;
