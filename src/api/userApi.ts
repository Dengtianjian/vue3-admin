import requestService from "@/service/requestService"

export default {
  login(account: string, password: string) {
    return requestService.post<{
      token: string
    }>("login", {
      userName: account,
      passWord: password,
      code: "0000"
    });
  }
}