import requestService from "@/service/requestService"
import type { TRole } from "@/types/roleTypes";

export default {
  list() {
    return requestService.get<{
      rows: TRole[],
      total: number
    }>("system/role/list");
  }
}