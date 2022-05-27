import requestService from "@/service/requestService";
import type { TDriver } from "@/types/driversTypes";

export default {
  list(page = 1, perPage = 10) {
    return requestService.get<{
      rows: TDriver[],
      total: number
    }>("system/user/list", {
      pageNum: page.toString(),
      pageSize: perPage.toString()
    });
  },
  add(data: {
    userId?: number,
    userName?: string,
    nickName?: string,
    password?: string,
    sex?: string,
    status?: string,
    allotIds?: number[],
    phonenumber?: string,
    roleIds?: number[]
  }) {
    return requestService.post("system/user/add", data)
  },
  edit(data: {
    userId?: number,
    userName?: string,
    nickName?: string,
    password?: string,
    sex?: string,
    status?: string,
    allotIds?: number[],
    phonenumber?: string,
    roleIds?: number[]
  }) {
    return requestService.post("system/user/edit", data);
  },
  remove(userIds: string): Promise<boolean> {
    return requestService.post("system/user/remove", null, {
      userIds
    }).then(() => true).catch((err) => err);
  }
}