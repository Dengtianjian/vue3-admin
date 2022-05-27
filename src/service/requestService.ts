import config from "@/config";
import http from "@/foundation/http"
import userStorage from "@/storage/userStorage";
import userService from "./userService";
import Router from "@/router";

function genUrl(uri: string): string {
  return `${config.apiUrl}/${uri}`;
}

export default {
  send<T>(uri: string, method = "GET", query?: Record<string, string>, body?: BodyInit | Record<string, unknown> | null, headers?: Record<string, string>): Promise<T> {
    if (navigator.onLine === false) {
      return Promise.reject({ msg: "网络已断开，请检查网络接口" });
    }
    if (userStorage.token) {
      if (!headers) {
        headers = {};
      }
      headers['Authorization'] = `Bearer ${userStorage.token}`;
    }
    return http.send<{
      code: number,
      msg: string
    } & T>(genUrl(uri), method, query, body, headers).then((res) => {
      if (res.code !== 200) {
        if (res.code === 401) {
          userService.logout();
        } else if (res.code === 403) {
          Router.replace("/");
        }
        return Promise.reject(res);
      }
      delete res.code, res.msg;
      delete res.msg;
      return res;
    })
  },
  post<T>(uri: string, body: BodyInit | Record<string, unknown> | null, query?: Record<string, string>, headers?: Record<string, string>) {
    return this.send<T>(uri, "POST", query, body, headers);
  },
  get<T>(uri: string, query?: Record<string, string>, headers?: Record<string, string>) {
    return this.send<T>(uri, "GET", query, headers);
  },
  delete<T>(uri: string, query?: Record<string, string>, headers?: Record<string, string>) {
    return this.send<T>(uri, "DELETE", query, headers);
  }
}