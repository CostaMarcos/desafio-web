import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const useLogout = () => {
  const router = useRouter();
  const logout = () => {
    Cookies.remove("currentUser");
    router.push("/login");
  };

  return { logout };
};