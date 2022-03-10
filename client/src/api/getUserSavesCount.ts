async function getUserSavesCount() {
    const url = "/api/saves/count";

    const response = await fetch(url);
    const result = await response.json();

    const userSavesCount = result.count;
    return userSavesCount;
}

export default getUserSavesCount;
