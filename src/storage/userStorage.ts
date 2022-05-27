import { reactive } from "vue"

export default reactive<{
  token: string,
  account: string,
  logged: boolean,
  sessionAuthVerified: boolean
}>({
  token: "",
  account: "",
  logged: false,
  sessionAuthVerified: false
})