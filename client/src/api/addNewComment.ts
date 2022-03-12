interface commentTypes {
    description: string;
    wallpaperId: string;
}

async function addNewComment(comment: commentTypes) {
    const url = "/api/comments";

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
    });
    const result = await response.json();

    return result;
}

export default addNewComment;
