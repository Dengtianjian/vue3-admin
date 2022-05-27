export type TDriver = {
  [key: string]: unknown,
  userId: number,
  userName: string,
  nickName: string,
  password: string,
  sex: "0" | "1",
  status: "0" | "1",
  allotIds: number[],
  createTime: string,
  phonenumber: string,
  roleIds: number[],
  admin: boolean
}