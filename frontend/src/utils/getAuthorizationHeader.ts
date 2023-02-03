import Cookies from "js-cookie";

export function getAuthorizationHeader() {
  const currentUser = Cookies.get("currentUser");
  console.log(123, currentUser)
  return {
    Authorization: `Bearer ${JSON.parse(currentUser || "{}")?.accessToken || ""}`,
  };
}