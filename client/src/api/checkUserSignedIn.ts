async function checkUserSignedIn() {
  const url = "/api/auth/check";
  const response = await fetch(url, { credentials: "include" });
  const result = await response.json();

  if (result.error) return null;
  else return result;
}

export default checkUserSignedIn;
