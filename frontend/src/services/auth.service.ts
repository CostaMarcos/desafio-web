import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import { getAuthorizationHeader } from "@/utils/getAuthorizationHeader";

export class AuthService {
  public readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
    this.instance.interceptors.request.use((config) => {
      Object.assign(config.headers, getAuthorizationHeader());
      return config;
    });
  }

  login = (username: string, password: string) => {
    return this.instance
      .post("/token/", {
        username,
        password,
      })
      .then((res) => {
        const userData: any = jwtDecode(res.data.access);

        return {
          id: userData.user_id,
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
          iat: userData.iat,
          exp: userData.exp,
        };
      });
  };

  getMe = (userId: string) => {
    return this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };
}
