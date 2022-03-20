interface newUserTypes {
    email: string;
    password: string;
}

async function signInUser(user: newUserTypes) {
    const url = "/api/auth/sign-in";

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const result = await response.json();

    return result;
}

export default signInUser;
