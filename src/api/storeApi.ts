import requestService from "@/service/requestService"
import type { TStore, TStoreSign } from "@/types/storeTypes"

export default {
  list(page = 1, perPage = 10, allotName = "") {
    return requestService.get<{
      rows: TStore[],
      total: number
    }>("DesktopServer/v2/shopList", {
      pageNum: page.toString(),
      pageSize: perPage.toString(),
      param: allotName
    });
  },
  getStoreSign(page = 1, perPage = 10, allotName = "") {
    return requestService.get<{
      total: number,
      rows: TStoreSign[]
    }>("DesktopServer/v2/groupList", {
      billDetailStatus: "100",
      pageNum: page.toString(),
      pageSize: perPage.toString(),
      param: allotName
    });
  },
  updateStoreSet(allotID: number, isCancelCheck: number, isCancelReceive: number, allotName: string) {
    return requestService.post("DesktopServer/v2/updateShop", {
      allotID,
      isCancelCheck,
      isCancelReceive,
      allotName
    });
  }
}