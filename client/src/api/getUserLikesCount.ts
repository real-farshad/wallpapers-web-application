async function getUserLikesCount() {
    const url = "/api/likes/count";

    const response = await fetch(url);
    const result = await response.json();
    const userLikesCount = result.count;

    return userLikesCount;
}

export default getUserLikesCount;
