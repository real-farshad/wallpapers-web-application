interface newUserTypes {
    username: string;
    email: string;
    password: string;
}

async function createUser(newUser: newUserTypes) {
    const url = "/api/auth/sign-up";

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });
    const result = await response.json();

    return result;
}

export default createUser;
