interface StandardCountTypes {
    count: number;
}

function StandardCount({ count }: StandardCountTypes) {
    const countString = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
    return <span>{countString}</span>;
}

export default StandardCount;
