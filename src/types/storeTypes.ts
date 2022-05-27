export type TStore = {
  [key: string]: unknown,
  allotID: number,
  allotName: string,
  isCancelCheck: 0 | 1,
  isCancelReceive: 0 | 1
}

export type TStoreSign = {
  allotID: number,
  allotName: string,
  billDate: number,
  billDetailId: number
  billDetailStatus: number
  billNo: string,
  deliverDate: number
  orgCode: string,
  signUrl: string
}