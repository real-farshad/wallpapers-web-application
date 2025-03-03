async function signOutUser() {
  const url = "/api/auth/sign-out";

  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export default signOutUser;
