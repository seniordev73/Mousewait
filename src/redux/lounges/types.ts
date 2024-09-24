export type Lounge = {
  [key: string]: any;
};
export type LoungeTag = {
  [key: string]: any;
};

export type commentDataList = {
  [key: string]: any;
};
export type LoungeSticker = {
  [key: string]: any;
};

export type AddSticker = {
  [key: string]: any;
};
export type LoungeDetail = {
  [key: string]: any;
};

export type LoungeComment = {
  [key: string]: any;
};

export type ThanksData = {
  [key: string]: any;
};

export type BookMark = {
  [key: string]: any;
};
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum TStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum BStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type MyStore = {
  [key: string]: any;
  store: any;
  credit_balance: any;
};

export type MyRecharge = {
  [key: string]: any;
  store: any;
  credit_balance: any;
};
export type MyHistory = {
  [key: string]: any;
  store: any;
  credit_balance: any;
};
export type MyTradeRequest = {
  [key: string]: any;
  store: any;
  credit_balance: any;
};
export type MyCollection = {
  [key: string]: any;
  store: any;
  credit_balance: any;
};
export type MyFav = {
  [key: string]: any;
};

export type Notification = {
  [key: string]: any;
};
export type AllUser = {
  [key: string]: any;
};
export type GetProfile = {
  [key: string]: any;
};

export type getMsg = {
  [key: string]: any;
};
export type GetQuality = {
  [key: string]: any;
};
export type GetTop = {
  [key: string]: any;
};
export type LoungeSticky = {
  [key: string]: any;
};
export interface LoungesSliceState {
  status: Status;

  tstatus: TStatus;
  bstatus: BStatus;
  items: Lounge[];
  stickyItem: LoungeSticky[];
  tagItems: LoungeTag[];
  stickerItems: LoungeSticker[];
  stickerPickItems: AddSticker[];
  itemDetail: LoungeDetail[];
  myStoreItem: MyStore[];
  myRechargeItem: MyRecharge[];
  myHistoryItem: MyHistory[];
  myCollectionItem: MyCollection[];
  myTradeRequestItem: MyTradeRequest[];
  myFavItem: MyFav[];
  LoungeComment: LoungeComment[];
  BookMark: BookMark;
  ThanksData: ThanksData[];
  sortByTime: '';
  commentDataList: commentDataList[];
  myNotificationItem: Notification[];
  userItem: AllUser[];
  getProfileItem: GetProfile[];
  getChatMsgItem: getMsg[];
  mwByQuality: GetQuality[];
  topMousewaiter: GetTop[];
}
