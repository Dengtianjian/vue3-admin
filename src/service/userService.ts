import userApi from "@/api/userApi";
import router from "@/router";
import userStorage from "@/storage/userStorage";
import { nextTick } from "vue";
import { useRouter } from "vue-router";
const R = useRouter();

export default {
  accountLogin(account: string, password: string): Promise<{
    account: string,
    token: string
  }> {
    return userApi
      .login(account, password)
      .then(({ token }) => {

        localStorage.setItem("account", account);
        localStorage.setItem("token", token);

        userStorage.account = account;
        userStorage.token = token;
        userStorage.logged = true;

        return {
          token,
          account,
        }
      });
  },
  slientLogin(): Promise<boolean> {
    userStorage.sessionAuthVerified = true;
    if (!localStorage.token) return Promise.resolve(false);

    userStorage.account = localStorage.account;
    userStorage.token = localStorage.token;
    userStorage.logged = true;

    return Promise.resolve(true);
  },
  logout() {
    userStorage.account = "";
    userStorage.logged = false;
    userStorage.token = "";

    localStorage.removeItem("account");
    localStorage.removeItem("token");

    router.replace("/user/login");
  }
}