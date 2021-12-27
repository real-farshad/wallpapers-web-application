import { Fragment } from "react";

interface StandardCountTypes {
    count: number;
}

function StandardCount({ count }: StandardCountTypes) {
    let countString = count >= 1000 ? `${Math.floor(count / 100) / 10}k` : count;
    return <Fragment>{countString}</Fragment>;
}

export default StandardCount;
