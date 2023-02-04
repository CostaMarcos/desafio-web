import { authService } from "@/services";
import Cookies from "js-cookie";
import { User } from "@/types/user";

export const useRegister = () => {
  const register = async (username: string, email: string, password: string, password2: string) => {
    const user = await authService.register(username, email, password, password2);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user as User;
  };

  return { register };
};