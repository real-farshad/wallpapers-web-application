async function checkUserSignedIn() {
    const response = await fetch("/api/auth/check", { credentials: "include" });
    const result = await response.json();

    if (result.error) return null;
    else return result;
}

export default checkUserSignedIn;
