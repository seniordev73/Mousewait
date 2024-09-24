// import { getProfileApi } from './../../api/getProfilebk';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllLoungesApi } from '../../api/getLounges';
import { getStickyLoungeApi } from '../../api/getStickyPost';
import { getStickyLoungeWdwApi } from '../../api/getStickyPostWdw';
import { getTagLoungesApi } from '../../api/getTagLounges';
import { getHashLoungesApi } from '../../api/getHashLounges';
import { getHashLoungesApiWdw } from '../../api/getHashLoungesWdw';
import { getCatLoungesApi } from '../../api/getCatLounges';
import { getCatLoungesWdwApi } from '../../api/getWdwCatLounges';
import { getStickerLoungesApi } from '../../api/getStickerLounges';
import { getAllUserLoungesApi } from '../../api/getUserLounges';
import { getAllWdwUserLoungesApi } from '../../api/getWdwUserLounges';
import { getRightBarApi } from '../../api/getRightBar';
import { getRightBarApiWdw } from '../../api/getWdwRightBar';
import { getAllLoungeDetailApi } from '../../api/getLoungeDetail';
import { getAllMyStoreApi } from '../../api/getMyStore';
import { getAllMyHistoryApi } from '../../api/getMyHistory';
import { getAllMyCollectionApi } from '../../api/getMyCollection';
import { getAllMyTradeRequestApi } from '../../api/getMyTradeRequest';
import { getAllMyRechargeCreditApi } from '../../api/getMyRechargeCredit';
import { getAllMyNotificationApi } from '../../api/getMyNotification';
import { getAllMyMWApi } from '../../api/getMyMW';
import { getBestViewdApi } from '../../api/getBestViewd';
import { getBestViewdApiWdw } from '../../api/getWdwBestViewd';
import { getAllUserApi } from '../../api/getUser';
import { getUserMenuApi } from '../../api/getUserMenu';
import { getTopMwByQualityPostApi } from '../../api/getTopMwByQualityPost';
import { getTopNewsFeaturedApi } from '../../api/getTopNewsFeatured';
import { getTopMousewaiterApi } from '../../api/getTopMousewaiter';

import { getTopMwByQualityPostApiWdw } from '../../api/getTopMwByQualityPostWdw';
import { getTopMousewaiterApiWdw } from '../../api/getTopMousewaiterWdw';
import { getProfileApi } from '../../api/getProfile';
import { getWDWdet } from '../../api/getWDWdet';
import { GET_BASE_URL, GET_BASE_URL_IMAGE } from '../../constants/apiEndpoints';

import { getDisnyworldLoungesApi } from '../../api/getDisnyworldLounges';

import { SortTypeParams } from '../../components/Sort';
import {
  Lounge,
  LoungeSticky,
  LoungeTag,
  LoungeSticker,
  AddSticker,
  LoungesSliceState,
  BookMark,
  LoungeComment,
  MyFav,
  Status,
  GetProfile,
  MyStore,
  MyRecharge,
  MyHistory,
  MyCollection,
  AllUser,
  MyTradeRequest,
  Notification,
  LoungeDetail,
  TStatus,
  BStatus,
  ThanksData,
  getMsg,
  GetQuality,
  GetTop,
} from './types';
import { getALlTagists } from '../../api/getAllTaglists';
import { getComposer } from '../../api/getComposer';
import { getComposerWdw } from '../../api/getComposerWdw';
import { getFriendChatMessage } from '../../api/getChatMessage';

const initialState: LoungesSliceState = {
  status: Status.LOADING,
  tstatus: TStatus.LOADING,
  bstatus: BStatus.LOADING,
  items: [],
  stickyItem: [],
  commentDataList: [],
  stickerPickItems: [],
  tagItems: [],
  stickerItems: [],
  itemDetail: [],
  myStoreItem: [],
  myRechargeItem: [],
  myHistoryItem: [],
  myCollectionItem: [],
  myTradeRequestItem: [],
  myFavItem: [],
  LoungeComment: [],
  BookMark: [],
  ThanksData: [],
  sortByTime: '',
  myNotificationItem: [],
  userItem: [],
  getProfileItem: [],
  getChatMsgItem: [],
  mwByQuality: [],
  topMousewaiter: [],
};

export type FetchLoungesType = {
  sortType: SortTypeParams;
  LoungeId: number;
  currentPage: any;
  searchValue: string;
  shortByTime: string;
};
export type FetchStickyLoungeType = {};
export type FetchStickyLoungeTypeWdw = {};

export type FetchTagLoungesType = {
  sortType: SortTypeParams;
  LoungeId: number;
  currentPage: number;
  tagValue: string;
  shortByTime: string;
};

export type FetchHashLoungesType = {
  sortType: SortTypeParams;
  LoungeId: number;
  currentPage: number;
  tagValue: string;
  shortByTime: string;
};
export type FetchHashLoungesTypeWdw = {
  sortType: SortTypeParams;
  LoungeId: number;
  currentPage: number;
  tagValue: string;
  shortByTime: string;
};
export type FetchCatLoungesType = {
  landid: any;
  landname: any;
  sortType: SortTypeParams;
  LoungeId: number;
  currentPage: number;
  searchValue: string;
  shortByTime: string;
};
export type FetchCatLoungesTypeWdw = {
  landid: any;
  landname: any;
  sortType: SortTypeParams;
  LoungeId: number;
  currentPage: number;
  searchValue: string;
  shortByTime: string;
};

export type FetchStickerLoungesType = {
  emojiData: [];
};

export type FetchBestViewd = {
  sortType: SortTypeParams;
  UserId: number;
  currentPage: number;
  type: any;
};
export type FetchBestViewdWdw = {
  sortType: SortTypeParams;
  UserId: number;
  currentPage: number;
  type: any;
};

export type FetchMyFavType = {
  sortType: SortTypeParams;
  UserId: number;
  currentPage: number;
};

export type FetchUserLoungesType = {
  sortType: SortTypeParams;
  UserId: number;
  currentPage: number;
};
export type FetchWdwUserLoungesType = {
  sortType: SortTypeParams;
  UserId: number;
  currentPage: number;
};
export type FetchRightBarData = {
  sortType: SortTypeParams;
  currentPage: number;
};
export type FetchRightBarDataWdw = {
  sortType: SortTypeParams;
  currentPage: number;
};

export type fetchAllTaglistsType = {
  tagData?: string;
  LoungeId: any;
};

export type FetchLoungesDetails = {
  LoungeId: any;
};

export type fetchwdwDetails = {
  LoungeId: any;
};

export type FetchUserType = {
  key: any;
};
export type FetchUserMenuType = {
  loginuserid: any;
};
export type FetchTopMwByQualityPostType = {};
export type FetchTopNewsFeatured = {};

export type FetchTopMousewaiterType = {
  type: any;
};

export type FetchTopMwByQualityPostTypeWdw = {};
export type FetchTopMousewaiterTypeWdw = {
  type: any;
};
export type FetchUserMessageType = {
  userId: any;
};

export type FetchProfileType = {
  key: any;
};

export type PostLoungesType = {
  chat_msg: any;
  chat_room_id: any;
  chat_img: any;
  // chat_type: any;
};
export type PostWdwLoungesType = {
  chat_msg: any;
  chat_room_id: any;
  chat_img: any;
  // chat_type: any;
};
export type BanUserLounges = {
  ban_chat_id: any;
  RemoveType: string;
};
export type BanUserLoungesWdw = {
  ban_chat_id: any;
  RemoveType: string;
};
export type DeleteConversion = {
  msg_id: any;
};
export type LockPost = {
  LoungeId: any;
  islock: any;
};
export type LockPostWdw = {
  LoungeId: any;
  islock: any;
};
export type BumpPost = {
  chat_id: any;
  type: any;
};
export type BumpPostWdw = {
  chat_id: any;
  type: any;
};
export type StickPost = {
  chat_id: any;
  type: any;
};
export type StickPostWdw = {
  chat_id: any;
  type: any;
};
export type RemoveImagePost = {
  chat_id: any;
};
export type RemoveImagePostWdw = {
  chat_id: any;
};

export type TradeRemove = {
  tid: any;
};

export type LikeCommentReply = {
  chat_id: any;
  comment_id: any;
  reply_id: any;
  commnet_userid: any;
  type: any;
  page: any;
};
export type WhoLikeCommentReply = {
  id: any;
};

export type PostLoungeComment = {
  chat_msg: any;
  chat_id: any;
};
export type PostLoungeCommentWdw = {
  chat_msg: any;
  chat_id: any;
};
export type PostLoungeCommentReply = {
  chat_reply_msg: any;
  chat_id: any;
  chat_reply_id: any;
  type: any;
  id: any;
  Type: any;
  LoungeId: any;
  chat_img: any;
};
export type PostLoungeCommentWdwEdit = {
  chat_reply_msg: any;
  chat_id: any;
  chat_reply_id: any;
  type: any;
  id: any;
  Type: any;
  LoungeId: any;
  chat_img: any;
};
export type PostLoungeCommentReplyWdw = {
  chat_reply_msg: any;
  chat_id: any;
  chat_reply_id: any;
  type: any;
  id: any;
  Type: any;
  LoungeId: any;
};

export type PostThankyou = {
  LoungeId: any;
};
export type PostThankyouWdw = {
  LoungeId: any;
};

export type PostBookMark = {
  LoungeId: any;
};
export type postBookMarkWdw = {
  LoungeId: any;
};

export type PostMyGift = {
  Id: number;
  UserName: any;
};
export type PostMyStore = {
  Id: number;
};
export type PostLoungeFlag = {
  LoungeId: any;
  Type: any;
  //Action:any,
  //ReportedId:any,
  ReasonForReport: any;
};
export type PostLoungeFlagWdw = {
  LoungeId: any;
  Type: any;
  //Action:any,
  //ReportedId:any,
  ReasonForReport: any;
};
export type FetchMyStoreType = {
  sortType: SortTypeParams;
  currentPage: number;
};

export type FetchMyNotificationType = {
  sortType: SortTypeParams;
  currentPage: number;
};

export type AddStickerType = {
  stickerPickItems: [];
};

export type DmMessage = {
  chat_id: any;
  user_id: any;
  tbox_name: any;
  user_text_message: any;
};

export type DmMessageReply = {
  user_id: any;
  user_text_message: any;
};
export type MyConversion = {
  user_id: any;
  user_text_message: any;
};
export type MovePost = {
  roomid: any;
  chatId: any;
};
export type MovePostWdw = {
  roomid: any;
  chatId: any;
};
export type SuscribeUnsuscribePost = {
  friendId: any;
  friendName: any;
  suscribeUnsuscribe: any;
};
export type SuscribeUnsbPost = {
  chat_id: any;
  suscribeUnsuscribe: any;
};
export type ComposerPost = {
  edit_chat_msg: any;
  chat_id: any;
  chat_img: any;
};
export type ComposerPostWdw = {
  edit_chat_msg: any;
  chat_id: any;
};

export type TagToPost = {
  chatId: any;
  checkedId: any;
};
export type fetchComposerType = {
  LoungeId: any;
};
export type fetchComposerTypeWdw = {
  LoungeId: any;
};
export const fetchLounges = createAsyncThunk<Lounge[], FetchLoungesType>(
  'users/fetchLoungesStatus',

  async ({ sortType, LoungeId, currentPage, searchValue, shortByTime }) => {
    return await getAllLoungesApi({
      sortType,
      LoungeId,
      currentPage,
      searchValue,
      shortByTime,
    });
  }
);
export const fetchStickyLounge = createAsyncThunk<
  Lounge[],
  FetchStickyLoungeType
>(
  'users/fetchStickyLoungeStatus',

  async ({}) => {
    return await getStickyLoungeApi({});
  }
);
export const fetchStickyLoungeWdw = createAsyncThunk<
  Lounge[],
  FetchStickyLoungeTypeWdw
>(
  'users/fetchStickyLoungeStatus',

  async ({}) => {
    return await getStickyLoungeWdwApi({});
  }
);

export const fetchDisneyWorldLounges = createAsyncThunk<
  Lounge[],
  FetchLoungesType
>(
  'users/fetchDisnyworldLoungesStatus',

  async ({ sortType, LoungeId, currentPage, searchValue, shortByTime }) => {
    return await getDisnyworldLoungesApi({
      sortType,
      LoungeId,
      currentPage,
      searchValue,
      shortByTime,
    });
  }
);

export const fetchTagLounges = createAsyncThunk<
  LoungeTag[],
  FetchTagLoungesType
>(
  'users/fetchLoungesTag',

  async ({ sortType, LoungeId, currentPage, tagValue, shortByTime }) => {
    return await getTagLoungesApi({
      sortType,
      LoungeId,
      currentPage,
      tagValue,
      shortByTime,
    });
  }
);

export const fetchHashLounges = createAsyncThunk<
  LoungeTag[],
  FetchHashLoungesType
>(
  'users/fetchLoungesHas',

  async ({ sortType, LoungeId, currentPage, tagValue, shortByTime }) => {
    return await getHashLoungesApi({
      sortType,
      LoungeId,
      currentPage,
      tagValue,
      shortByTime,
    });
  }
);

export const fetchHashLoungesWdw = createAsyncThunk<
  LoungeTag[],
  FetchHashLoungesTypeWdw
>(
  'users/fetchLoungesHasWdw',

  async ({ sortType, LoungeId, currentPage, tagValue, shortByTime }) => {
    return await getHashLoungesApiWdw({
      sortType,
      LoungeId,
      currentPage,
      tagValue,
      shortByTime,
    });
  }
);

export const fetchCatLounges = createAsyncThunk<
  LoungeTag[],
  FetchCatLoungesType
>(
  'users/fetchLoungesCat',

  async ({
    landid,
    landname,
    sortType,
    LoungeId,
    currentPage,
    searchValue,
    shortByTime,
  }) => {
    return await getCatLoungesApi({
      landid,
      landname,
      sortType,
      LoungeId,
      currentPage,
      searchValue,
      shortByTime,
    });
  }
);
export const fetchCatLoungesWdw = createAsyncThunk<
  LoungeTag[],
  FetchCatLoungesTypeWdw
>(
  'users/fetchLoungesCatWdw',

  async ({
    landid,
    landname,
    sortType,
    LoungeId,
    currentPage,
    searchValue,
    shortByTime,
  }) => {
    return await getCatLoungesWdwApi({
      landid,
      landname,
      sortType,
      LoungeId,
      currentPage,
      searchValue,
      shortByTime,
    });
  }
);

export const fetchStickerLounges = createAsyncThunk<
  LoungeSticker[],
  FetchStickerLoungesType
>(
  'users/fetchLoungesSticker',

  async ({ emojiData }) => {
    return await getStickerLoungesApi({ emojiData });
  }
);

export const fetchBestViewd = createAsyncThunk<Lounge[], FetchBestViewd>(
  'users/fetchbestviewd',

  async ({ sortType, UserId, currentPage, type }) => {
    return await getBestViewdApi({ sortType, UserId, currentPage, type });
  }
);

export const fetchBestViewdWdw = createAsyncThunk<Lounge[], FetchBestViewdWdw>(
  'users/fetchbestviewdWdw',

  async ({ sortType, UserId, currentPage, type }) => {
    return await getBestViewdApiWdw({ sortType, UserId, currentPage, type });
  }
);

export const fetchMyFav = createAsyncThunk<Lounge[], FetchMyFavType>(
  'users/fetchMyFavStatus',
  async ({ sortType, UserId, currentPage }) => {
    return await getAllMyMWApi({ sortType, UserId, currentPage });
  }
);

export const fetchUserLounges = createAsyncThunk<
  Lounge[],
  FetchUserLoungesType
>(
  'users/fetchUserLoungesStatus',

  async ({ sortType, UserId, currentPage }) => {
    return await getAllUserLoungesApi({ sortType, UserId, currentPage });
  }
);

export const fetchWdwUserLounges = createAsyncThunk<
  Lounge[],
  FetchWdwUserLoungesType
>(
  'users/fetchUserLoungesStatus',

  async ({ sortType, UserId, currentPage }) => {
    return await getAllWdwUserLoungesApi({ sortType, UserId, currentPage });
  }
);

export const fetchRightBar = createAsyncThunk<Lounge[], FetchRightBarData>(
  'users/fetchRightBarStatus',

  async ({ sortType, currentPage }) => {
    return await getRightBarApi({ sortType, currentPage });
  }
);

export const fetchRightBarWdw = createAsyncThunk<
  Lounge[],
  FetchRightBarDataWdw
>(
  'users/fetchRightBarStatusWdw',

  async ({ sortType, currentPage }) => {
    return await getRightBarApiWdw({ sortType, currentPage });
  }
);

export const fetchAllTaglists = createAsyncThunk<
  Lounge[],
  fetchAllTaglistsType
>(
  'users/fetchAllTaglists',

  async (tagData, LoungeId) => {
    return await getALlTagists(tagData);
  }
);

export const fetchByComposerEditor = createAsyncThunk<
  Lounge[],
  fetchComposerType
>('users/fetchByComposerEditor', async (LoungeId) => {
  //let chat_id = LoungeId;
  return await getComposer(LoungeId);
});
export const fetchByComposerEditorWdw = createAsyncThunk<
  Lounge[],
  fetchComposerTypeWdw
>('users/fetchByComposerEditorWdw', async (LoungeId) => {
  //let chat_id = LoungeId;
  return await getComposerWdw(LoungeId);
});

export const fetchUserMessage = createAsyncThunk<
  Lounge[],
  FetchUserMessageType
>('users/fetchUserMessage', async (userId) => {
  //let chat_id = LoungeId;
  return await getFriendChatMessage(userId);
});

export const fetchLoungeDetails = createAsyncThunk<
  Lounge[],
  FetchLoungesDetails
>(
  'users/fetchLoungesDetails',

  async ({ LoungeId }) => {
    return await getAllLoungeDetailApi({ LoungeId });
  }
);

export const fetchwdwLoungeDetails = createAsyncThunk<
  Lounge[],
  fetchwdwDetails
>(
  'users/fetchwdwDetails',

  async ({ LoungeId }) => {
    return await getWDWdet({ LoungeId });
  }
);

export const postLounge = createAsyncThunk<Lounge[], PostLoungesType>(
  'users/postLoungeStatus',
  async ({ chat_msg, chat_room_id, chat_img }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postLounge',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_msg,
            chat_room_id,
            chat_img
            // chat_type
          }),
        }
      );
      /*       let data = await response.json();
      if (data.sucess) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    } */
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postLoungeWdw = createAsyncThunk<Lounge[], PostWdwLoungesType>(
  'users/postWdwLoungeStatus',
  async ({ chat_msg, chat_room_id, chat_img }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postWdwLounge',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_msg,
            chat_room_id,
            chat_img
          }),
        }
      );
      
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postLoungeFlag = createAsyncThunk<Lounge[], PostLoungeFlag>(
  'users/postLoungeFlag',

  async ({ LoungeId, Type, ReasonForReport }, thunkAPI) => {
    let chat_id: any = LoungeId;
    let type: any = Type;
    //let  action:any= Action
    let reasion_for_report: any = ReasonForReport;
    /*    console.log(ReasonForReport);
    console.log(LoungeId);
    console.log(type); */

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(GET_BASE_URL + '/backend/api/v1/flag', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
          type,
          reasion_for_report,
        }),
      });

      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postLoungeFlagWdw = createAsyncThunk<Lounge[], PostLoungeFlagWdw>(
  'users/postLoungeFlagWdw',

  async ({ LoungeId, Type, ReasonForReport }, thunkAPI) => {
    let chat_id: any = LoungeId;
    let type: any = Type;
    //let  action:any= Action
    let reasion_for_report: any = ReasonForReport;
    /*    console.log(ReasonForReport);
    console.log(LoungeId);
    console.log(type); */

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(GET_BASE_URL + '/backend/api/v1/flagWdw', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
          type,
          reasion_for_report,
        }),
      });

      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const postMyGift = createAsyncThunk<Lounge[], PostMyGift>(
  'users/postMyGift',

  async ({ Id, UserName }, thunkAPI) => {
    let hdd_coll_id: any = Id;
    let user_name: any = UserName;
    //console.log(hdd_coll_id)
    // console.log(user_name);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/giftThisProduct',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hdd_coll_id,
            user_name,
          }),
        }
      );

      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const postMyStore = createAsyncThunk<Lounge[], PostMyStore>(
  'users/postMyStore',

  async ({ Id }, thunkAPI) => {
    let id: any = Id;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/mWStoreBuy',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeUserLounge = createAsyncThunk<Lounge[], BanUserLounges>(
  'users/postUserLounge',
  async ({ ban_chat_id, RemoveType }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/removeChat',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ban_chat_id,
            RemoveType,
          }),
        }
      );
      let data = await response.json();
      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeUserLoungeWdw = createAsyncThunk<
  Lounge[],
  BanUserLoungesWdw
>('users/postUserLoungeWdw', async ({ ban_chat_id, RemoveType }, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      GET_BASE_URL + '/backend/api/v1/removeChatWdw',
      {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ban_chat_id,
          RemoveType,
        }),
      }
    );
    let data = await response.json();
    if (data.data) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data.error);
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const deleteConversionMessage = createAsyncThunk<
  Lounge[],
  DeleteConversion
>('users/deleteConversion', async ({ msg_id }, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      GET_BASE_URL + '/backend/api/v1/conversationRemove',
      {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msg_id,
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    if (data.data) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data.error);
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const lockPost = createAsyncThunk<Lounge[], LockPost>(
  'users/lockChat',
  async ({ LoungeId, islock }, thunkAPI) => {
    let chat_id: any = LoungeId;
    let type: any = islock;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(GET_BASE_URL + '/backend/api/v1/postLock', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
          type,
        }),
      });
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const lockPostWdw = createAsyncThunk<Lounge[], LockPostWdw>(
  'users/lockChatWdw',
  async ({ LoungeId, islock }, thunkAPI) => {
    let chat_id: any = LoungeId;
    let type: any = islock;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postLockWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
            type,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const bumpPost = createAsyncThunk<Lounge[], BumpPost>(
  'users/bumpChat',
  async ({ chat_id, type }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(GET_BASE_URL + '/backend/api/v1/postBump', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
          type,
        }),
      });
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const bumpPostWdw = createAsyncThunk<Lounge[], BumpPostWdw>(
  'users/bumpChatWdw',
  async ({ chat_id, type }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postBumpWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
            type,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const stickPost = createAsyncThunk<Lounge[], StickPost>(
  'users/stickChat',
  async ({ type, chat_id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postStickOrUnstick',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type,
            chat_id,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const stickPostWdw = createAsyncThunk<Lounge[], StickPostWdw>(
  'users/stickChatWdw',
  async ({ type, chat_id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postStickOrUnstickWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type,
            chat_id,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeImageOverPost = createAsyncThunk<Lounge[], RemoveImagePost>(
  'users/removeChatImage',
  async ({ chat_id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/removePostImage',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeImageOverPostWdw = createAsyncThunk<
  Lounge[],
  RemoveImagePostWdw
>('users/removeChatImage', async ({ chat_id }, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      GET_BASE_URL + '/backend/api/v1/removePostImageWdw',
      {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
        }),
      }
    );
    let data = await response.json();

    if (data.data) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data.error);
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const removeTrade = createAsyncThunk<Lounge[], TradeRemove>(
  'users/tradeUserLounge',
  async ({ tid }, thunkAPI) => {
    try {
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/tradeRequestReject',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tid,
          }),
        }
      );
      let data = await response.json();
      if (data.sucess) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const acceptTrade = createAsyncThunk<Lounge[], TradeRemove>(
  'users/tradeAcceptUserLounge',
  async ({ tid }, thunkAPI) => {
    try {
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/tradeRequestAccept',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tid,
          }),
        }
      );
      let data = await response.json();
      if (data.sucess) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postLoungeComment = createAsyncThunk<Lounge[], PostLoungeComment>(
  'users/postLoungeComment',
  async ({ chat_msg, chat_id }, thunkAPI) => {
    //console.log(chat_msg);
    //return false;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postComment',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_msg,
            chat_id,
          }),
        }
      );

      let data: any = await response.json();

      if (data.data.success) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const postLoungeCommentWdw = createAsyncThunk<
  Lounge[],
  PostLoungeCommentWdw
>('users/postLoungeCommentWdw', async ({ chat_msg, chat_id }, thunkAPI) => {
  //console.log(chat_msg);
  //return false;
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      GET_BASE_URL + '/backend/api/v1/postCommentWdw',
      {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_msg,
          chat_id,
        }),
      }
    );
    let data: any = await response.json();

    if (data.data.success) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data.error);
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const likeCommentReply = createAsyncThunk<Lounge[], LikeCommentReply>(
  'users/likeCommentReply',
  async (
    { chat_id, comment_id, reply_id, commnet_userid, type, page },
    thunkAPI
  ) => {
    try {
      const token = localStorage.getItem('token');
      if (page == 'DL') {
        const response = await fetch(
          GET_BASE_URL + '/backend/api/v1/likeCommentAndReply',
          {
            method: 'POST',
            headers: {
              Authorization: `bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id,
              comment_id,
              reply_id,
              commnet_userid,
              type,
            }),
          }
        );
        let data = await response.json();

        if (data.data) {
          return { ...data };
        } else {
          return thunkAPI.rejectWithValue(data.error);
        }
      } else {
        const response = await fetch(
          GET_BASE_URL + '/backend/api/v1/likeCommentAndReplyWdw',
          {
            method: 'POST',
            headers: {
              Authorization: `bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id,
              comment_id,
              reply_id,
              commnet_userid,
              type,
            }),
          }
        );
        let data = await response.json();

        if (data.data) {
          return { ...data };
        } else {
          return thunkAPI.rejectWithValue(data.error);
        }
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const wholikeCommentReply = createAsyncThunk<
  Lounge[],
  WhoLikeCommentReply
>('users/wholikeCommentReply', async ({ id }, thunkAPI) => {
  try {
    const response = await fetch(GET_BASE_URL + '/backend/api/v1/getLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    let data = await response.json();

    if (data) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data.error);
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const postLoungeCommentEdit = createAsyncThunk<
  Lounge[],
  PostLoungeCommentReply
>(
  'users/postLoungeCommentEdit',
  async (
    { chat_reply_msg, chat_id, chat_reply_id, type, id, Type, LoungeId, chat_img },
    thunkAPI
  ) => {

    if (LoungeId == undefined) {
    } else {
      chat_id = LoungeId;
      type = Type;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(GET_BASE_URL + '/backend/api/v1/editChat', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_reply_msg,
          chat_id,
          chat_reply_id,
          type,
          id,
          chat_img
        }),
      });
      let data: any = await response.json();

      if (data.data.success) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postLoungeCommentEditWdw = createAsyncThunk<
  Lounge[],
  PostLoungeCommentWdwEdit
>(
  'users/postLoungeCommentEditWdw',
  async (
    { chat_reply_msg, chat_id, chat_reply_id, type, id, Type, LoungeId, chat_img },
    thunkAPI
  ) => {

    if (LoungeId == undefined) {
    } else {
      chat_id = LoungeId;
      type = Type;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/editChatWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_reply_msg,
            chat_id,
            chat_reply_id,
            type,
            id,
            chat_img
          }),
        }
      );
      let data: any = await response.json();

      if (data.data.success) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postLoungeCommentReply = createAsyncThunk<
  Lounge[],
  PostLoungeCommentReply
>(
  'users/postLoungeComment',
  async ({ chat_reply_msg, chat_id, chat_reply_id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/commentReply',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_reply_msg,
            chat_id,
            chat_reply_id,
          }),
        }
      );
      let data: any = await response.json();

      if (data.data.success) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postLoungeCommentReplyWdw = createAsyncThunk<
  Lounge[],
  PostLoungeCommentReplyWdw
>(
  'users/postLoungeCommentWdw',
  async ({ chat_reply_msg, chat_id, chat_reply_id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/commentReplyWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_reply_msg,
            chat_id,
            chat_reply_id,
          }),
        }
      );
      let data: any = await response.json();

      if (data.data.success) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const postThankyou = createAsyncThunk<Lounge[], PostThankyou>(
  'users/postLoungeThankyou',

  async ({ LoungeId }, thunkAPI) => {
    let chat_id = LoungeId;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(GET_BASE_URL + '/backend/api/v1/thankyou', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
        }),
      });
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const postThankyouWdw = createAsyncThunk<Lounge[], PostThankyouWdw>(
  'users/postLoungeThankyouWdw',

  async ({ LoungeId }, thunkAPI) => {
    let chat_id = LoungeId;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/thankyouWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
          }),
        }
      );
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const postBookMark = createAsyncThunk<Lounge[], PostBookMark>(
  'users/postLoungeBookMark',

  async ({ LoungeId }, thunkAPI) => {
    let chat_id = LoungeId;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(GET_BASE_URL + '/backend/api/v1/bookmark', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
        }),
      });
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const postBookMarkWdw = createAsyncThunk<Lounge[], postBookMarkWdw>(
  'users/postLoungeBookMarkWdw',

  async ({ LoungeId }, thunkAPI) => {
    let chat_id = LoungeId;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/bookmarkWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
          }),
        }
      );
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchMyStore = createAsyncThunk<MyStore[], FetchMyStoreType>(
  'users/fetchMyStoreStatus',
  async ({ sortType, currentPage }) => {
    return await getAllMyStoreApi({ sortType, currentPage });
  }
);

export const fetchMyHistory = createAsyncThunk<MyStore[], FetchMyStoreType>(
  'users/fetchMyHistoryStatus',
  async ({ sortType, currentPage }) => {
    return await getAllMyHistoryApi({ sortType, currentPage });
  }
);

export const fetchMyCollection = createAsyncThunk<MyStore[], FetchMyStoreType>(
  'users/fetchMyCollectionStatus',
  async ({ sortType, currentPage }) => {
    return await getAllMyCollectionApi({ sortType, currentPage });
  }
);

export const fetchMyRechargeCredit = createAsyncThunk<
  MyRecharge[],
  FetchMyStoreType
>('users/fetchMyRechargeCreditStatus', async ({ sortType, currentPage }) => {
  return await getAllMyRechargeCreditApi({ sortType, currentPage });
});

export const fetchMyTradeRequest = createAsyncThunk<
  MyStore[],
  FetchMyStoreType
>('users/fetchMyTradeRequestStatus', async ({ sortType, currentPage }) => {
  return await getAllMyTradeRequestApi({ sortType, currentPage });
});
export const fetchMyProfile = createAsyncThunk<MyStore[], FetchProfileType>(
  'users/fetchMyProfileStatus',
  async ({ key }) => {
    return await getProfileApi({ key });
  }
);

export const fetchMyNotification = createAsyncThunk<
  Notification[],
  FetchMyNotificationType
>('users/fetchMyNotificationStatus', async ({ sortType, currentPage }) => {
  return await getAllMyNotificationApi({ sortType, currentPage });
});

export const fetchUser = createAsyncThunk<MyStore[], FetchUserType>(
  'users/fetchUserStatus',
  async ({ key }) => {
    return await getAllUserApi({ key });
  }
);

export const fetchUserMenu = createAsyncThunk<MyStore[], FetchUserMenuType>(
  'users/fetchUserMenuStatus',
  async ({ loginuserid }) => {
    return await getUserMenuApi({ loginuserid });
  }
);
export const fetchTopMwByQualityPost = createAsyncThunk<
  MyStore[],
  FetchTopMwByQualityPostType
>('users/fetchTopMwByQualityPostStatus', async ({}) => {
  return await getTopMwByQualityPostApi({});
});

export const fetchTopMousewaiter = createAsyncThunk<
  MyStore[],
  FetchTopMousewaiterType
>('users/fetchTopMousewaiterStatus', async ({ type }) => {
  return await getTopMousewaiterApi({ type });
});

export const fetchTopMwByQualityPostWdw = createAsyncThunk<
  MyStore[],
  FetchTopMwByQualityPostTypeWdw
>('users/fetchTopMwByQualityPostStatusWdw', async ({}) => {
  return await getTopMwByQualityPostApiWdw({});
});

export const fetchTopMousewaiterWdw = createAsyncThunk<
  MyStore[],
  FetchTopMousewaiterTypeWdw
>('users/fetchTopMousewaiterStatusWdw', async ({ type }) => {
  return await getTopMousewaiterApiWdw({ type });
});

export const fetchTopNewsFeatured = createAsyncThunk<
  MyStore[],
  FetchTopNewsFeatured
>('users/fetchTopNewsFeaturedStatus', async ({}) => {
  return await getTopNewsFeaturedApi({});
});

export const sendDmMessage = createAsyncThunk<Lounge[], DmMessage>(
  'users/sendDmMessage',
  async ({ chat_id, user_id, tbox_name, user_text_message }, thunkAPI) => {
    /*     console.log(chat_id);
    console.log(comment_id);
    console.log(reply_id);
    console.log(commnet_userid);
    console.log(type);
    return false; */
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/chatMessage',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
            user_id,
            tbox_name,
            user_text_message,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const sendDmMessageReply = createAsyncThunk<Lounge[], DmMessageReply>(
  'users/sendDmMessageReply',
  async ({ user_id, user_text_message }, thunkAPI) => {
    //console.log(user_id);
    //console.log(user_text_message);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/conversationReply',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id,
            user_text_message,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const assignTagToPost = createAsyncThunk<Lounge[], TagToPost>(
  'users/sendTagToPost',
  async ({ chatId, checkedId }, thunkAPI) => {
    //console.log(chatId);
    //console.log(checkedId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/assignTagToPost',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatId,
            checkedId,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const myConversion = createAsyncThunk<Lounge[], MyConversion>(
  'users/sendMyConversion',
  async ({ user_id, user_text_message }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/myConversationPost',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id,
            user_text_message,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const movePost = createAsyncThunk<Lounge[], MovePost>(
  'users/sendMovePost',
  async ({ roomid, chatId }, thunkAPI) => {
    let chat_id: any = chatId;

    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await fetch(GET_BASE_URL + '/backend/api/v1/movePost/'+user_id, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomid,
          chat_id,
        }),
      });
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const movePostWdw = createAsyncThunk<Lounge[], MovePostWdw>(
  'users/sendMovePostWdw',
  async ({ roomid, chatId }, thunkAPI) => {
    let chat_id: any = chatId;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/movePostWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomid,
            chat_id,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const suscribeOrUnsuscribePost = createAsyncThunk<
  Lounge[],
  SuscribeUnsuscribePost
>(
  'users/suscribeUnsuscriPost',
  async ({ friendId, friendName, suscribeUnsuscribe }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/suscribeOrUnsuscribePost',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            friendId,
            friendName,
            suscribeUnsuscribe,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const postSubscribeFromLounge = createAsyncThunk<
  Lounge[],
  SuscribeUnsbPost
>(
  'users/suscribeUnsuscriPost',
  async ({ chat_id, suscribeUnsuscribe }, thunkAPI) => {
    /* console.log(chat_id);
    console.log(suscribeUnsuscribe);
    return false; */
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/postSuscribeUnsuscribe',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
            suscribeUnsuscribe,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const composerPost = createAsyncThunk<Lounge[], ComposerPost>(
  'users/sendMovePost',
  async ({ chat_id, edit_chat_msg, chat_img }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/advanceEditorPost',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
            edit_chat_msg,
            chat_img,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const composerPostWdw = createAsyncThunk<Lounge[], ComposerPostWdw>(
  'users/sendMovePostWdw',
  async ({ chat_id, edit_chat_msg }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/advanceEditorPostWdw',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
            edit_chat_msg,
          }),
        }
      );
      let data = await response.json();

      if (data.data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loungesSlice = createSlice({
  name: 'lounges',
  initialState,
  reducers: {
    addSticker: (state, action: PayloadAction<AddStickerType>) => {
      if (action.payload != null) {
        let string: any = `<img src="${GET_BASE_URL_IMAGE}/disneyland/images/products_thumbnail/${action.payload}" class="img-fluid" alt="">`;
        state.stickerPickItems = string;
      }
      /*    const findItem = state.stickerPickItems.find((obj) => obj === string);

        if (!findItem) {
          state.stickerPickItems.push(string);
        }
      } else {
        state.stickerPickItems = [];
      } */
    },

    setItems: (state, action: PayloadAction<Lounge[]>) => {
      state.items = action.payload;
    },

    setSortByTime: (state, action) => {
      state.sortByTime = action.payload.SortTimeType;
    },

    setStickyItem: (state, action: PayloadAction<LoungeSticky[]>) => {
      state.stickyItem = action.payload;
    },

    setmyStoreItem: (state, action: PayloadAction<MyStore[]>) => {
      state.myStoreItem = action.payload;
    },
    setmyRechargeItem: (state, action: PayloadAction<MyRecharge[]>) => {
      state.myRechargeItem = action.payload;
    },
    setmyHistoryItem: (state, action: PayloadAction<MyHistory[]>) => {
      state.myHistoryItem = action.payload;
    },
    setmyColectionItem: (state, action: PayloadAction<MyCollection[]>) => {
      state.myCollectionItem = action.payload;
    },
    setgetProfileItem: (state, action: PayloadAction<GetProfile[]>) => {
      state.getProfileItem = action.payload;
    },
    setuserItem: (state, action: PayloadAction<AllUser[]>) => {
      state.userItem = action.payload;
    },
    setmyTradeRequestItem: (state, action: PayloadAction<MyTradeRequest[]>) => {
      state.myTradeRequestItem = action.payload;
    },
    setmyNotificationItem: (state, action: PayloadAction<Notification[]>) => {
      state.myNotificationItem = action.payload;
    },
    setItemDetail: (state, action: PayloadAction<LoungeDetail[]>) => {
      state.itemDetail = action.payload;
    },
    setMwQuality: (state, action: PayloadAction<GetQuality[]>) => {
      state.itemDetail = action.payload;
    },
    setTopMousewaiter: (state, action: PayloadAction<GetTop[]>) => {
      state.itemDetail = action.payload;
    },
    setLoungeComment: (state, action: PayloadAction<LoungeComment[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLounges.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchLounges.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchLounges.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchDisneyWorldLounges.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchDisneyWorldLounges.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchDisneyWorldLounges.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchCatLounges.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCatLounges.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCatLounges.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchCatLoungesWdw.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCatLoungesWdw.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCatLoungesWdw.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchTagLounges.pending, (state) => {
      state.status = Status.LOADING;
      state.tagItems = [];
    });
    builder.addCase(fetchTagLounges.fulfilled, (state, action) => {
      state.tagItems = action.payload;
      state.commentDataList = action.payload[0].comments;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTagLounges.rejected, (state) => {
      state.status = Status.ERROR;
      state.tagItems = [];
    });

    /*     builder.addCase(fetchStickyLounge.pending, (state) => {
      state.status = Status.LOADING;
      state.stickyItem = [];
    });
    builder.addCase(fetchStickyLounge.fulfilled, (state, action) => {
      state.stickyItem = action.payload;
      state.commentDataList = action.payload[0].comments;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchStickyLounge.rejected, (state) => {
      state.status = Status.ERROR;
      state.stickyItem = [];
    });
 */
    builder.addCase(fetchHashLounges.pending, (state) => {
      state.status = Status.LOADING;
      state.tagItems = [];
    });
    builder.addCase(fetchHashLounges.fulfilled, (state, action) => {
      state.tagItems = action.payload;
      state.commentDataList = action.payload[0].comments;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchHashLounges.rejected, (state) => {
      state.status = Status.ERROR;
      state.tagItems = [];
    });
    builder.addCase(fetchHashLoungesWdw.pending, (state) => {
      state.status = Status.LOADING;
      state.tagItems = [];
    });
    builder.addCase(fetchHashLoungesWdw.fulfilled, (state, action) => {
      state.tagItems = action.payload;
      state.commentDataList = action.payload[0].comments;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchHashLoungesWdw.rejected, (state) => {
      state.status = Status.ERROR;
      state.tagItems = [];
    });

    builder.addCase(removeUserLounge.pending, (state) => {
      state.tagItems = [];
    });
    builder.addCase(removeUserLounge.fulfilled, (state, action) => {
      state.tagItems = action.payload;
    });
    builder.addCase(removeUserLounge.rejected, (state) => {
      state.tagItems = [];
    });
    builder.addCase(fetchStickyLounge.pending, (state) => {
      state.stickyItem = [];
    });
    builder.addCase(fetchStickyLounge.fulfilled, (state, action) => {
      state.stickyItem = action.payload;
    });
    builder.addCase(fetchStickyLounge.rejected, (state) => {
      state.stickyItem = [];
    });

    builder.addCase(removeTrade.pending, (state) => {
      state.tagItems = [];
    });
    builder.addCase(removeTrade.fulfilled, (state, action) => {
      state.tagItems = action.payload;
    });
    builder.addCase(removeTrade.rejected, (state) => {
      state.tagItems = [];
    });
    builder.addCase(acceptTrade.pending, (state) => {
      state.tagItems = [];
    });
    builder.addCase(acceptTrade.fulfilled, (state, action) => {
      state.tagItems = action.payload;
    });
    builder.addCase(acceptTrade.rejected, (state) => {
      state.tagItems = [];
    });

    builder.addCase(likeCommentReply.pending, (state) => {
      state.tagItems = [];
    });
    builder.addCase(likeCommentReply.fulfilled, (state, action) => {
      state.tagItems = action.payload;
    });
    builder.addCase(likeCommentReply.rejected, (state) => {
      state.tagItems = [];
    });
    builder.addCase(wholikeCommentReply.pending, (state) => {
      state.tagItems = [];
    });
    builder.addCase(wholikeCommentReply.fulfilled, (state, action) => {
      state.tagItems = action.payload;
    });
    builder.addCase(wholikeCommentReply.rejected, (state) => {
      state.tagItems = [];
    });

    builder.addCase(fetchStickerLounges.pending, (state) => {
      state.stickerItems = [];
    });
    builder.addCase(fetchStickerLounges.fulfilled, (state, action) => {
      state.stickerItems = action.payload;
    });
    builder.addCase(fetchStickerLounges.rejected, (state) => {
      state.stickerItems = [];
    });

    builder.addCase(fetchBestViewd.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchBestViewd.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchBestViewd.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchBestViewdWdw.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchBestViewdWdw.fulfilled, (state, action) => {
      state.items = action.payload[0].most_viewed_chat;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchBestViewdWdw.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchMyFav.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchMyFav.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyFav.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchUserLounges.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchUserLounges.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUserLounges.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(fetchTopMwByQualityPost.pending, (state) => {
      state.status = Status.LOADING;
      state.mwByQuality = [];
    });
    builder.addCase(fetchTopMwByQualityPost.fulfilled, (state, action) => {
      state.mwByQuality = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTopMwByQualityPost.rejected, (state) => {
      state.status = Status.ERROR;
      state.mwByQuality = [];
    });

    builder.addCase(fetchTopMousewaiter.pending, (state) => {
      state.status = Status.LOADING;
      state.topMousewaiter = [];
    });
    builder.addCase(fetchTopMousewaiter.fulfilled, (state, action) => {
      state.topMousewaiter = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTopMousewaiter.rejected, (state) => {
      state.status = Status.ERROR;
      state.topMousewaiter = [];
    });

    builder.addCase(fetchTopMwByQualityPostWdw.pending, (state) => {
      state.status = Status.LOADING;
      state.mwByQuality = [];
    });
    builder.addCase(fetchTopMwByQualityPostWdw.fulfilled, (state, action) => {
      state.mwByQuality = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTopMwByQualityPostWdw.rejected, (state) => {
      state.status = Status.ERROR;
      state.mwByQuality = [];
    });
    builder.addCase(fetchTopMousewaiterWdw.pending, (state) => {
      state.status = Status.LOADING;
      state.topMousewaiter = [];
    });
    builder.addCase(fetchTopMousewaiterWdw.fulfilled, (state, action) => {
      state.topMousewaiter = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchTopMousewaiterWdw.rejected, (state) => {
      state.status = Status.ERROR;
      state.topMousewaiter = [];
    });

    builder.addCase(fetchLoungeDetails.pending, (state) => {
      state.status = Status.LOADING;
      state.itemDetail = [];
    });
    builder.addCase(fetchLoungeDetails.fulfilled, (state, action) => {
      state.itemDetail = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchLoungeDetails.rejected, (state) => {
      state.status = Status.ERROR;
      state.itemDetail = [];
    });

    builder.addCase(fetchwdwLoungeDetails.pending, (state) => {
      state.status = Status.LOADING;
      state.itemDetail = [];
    });
    builder.addCase(fetchwdwLoungeDetails.fulfilled, (state, action) => {
      state.itemDetail = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchwdwLoungeDetails.rejected, (state) => {
      state.status = Status.ERROR;
      state.itemDetail = [];
    });

    builder.addCase(fetchMyStore.pending, (state) => {
      state.status = Status.LOADING;
      state.myStoreItem = [];
    });
    builder.addCase(fetchMyStore.fulfilled, (state, action) => {
      state.myStoreItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyStore.rejected, (state) => {
      state.status = Status.ERROR;
      state.myStoreItem = [];
    });

    builder.addCase(fetchMyHistory.pending, (state) => {
      state.status = Status.LOADING;
      state.myHistoryItem = [];
    });
    builder.addCase(fetchMyHistory.fulfilled, (state, action) => {
      state.myHistoryItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyHistory.rejected, (state) => {
      state.status = Status.ERROR;
      state.myHistoryItem = [];
    });
    builder.addCase(fetchMyCollection.pending, (state) => {
      state.status = Status.LOADING;
      state.myCollectionItem = [];
    });
    builder.addCase(fetchMyCollection.fulfilled, (state, action) => {
      state.myCollectionItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyCollection.rejected, (state) => {
      state.status = Status.ERROR;
      state.myCollectionItem = [];
    });

    builder.addCase(fetchMyProfile.pending, (state) => {
      state.status = Status.LOADING;
      state.getProfileItem = [];
    });
    builder.addCase(fetchMyProfile.fulfilled, (state, action) => {
      state.getProfileItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyProfile.rejected, (state) => {
      state.status = Status.ERROR;
      state.getProfileItem = [];
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
      state.userItem = [];
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.userItem = [];
    });
    builder.addCase(fetchMyRechargeCredit.pending, (state) => {
      state.status = Status.LOADING;
      state.myRechargeItem = [];
    });
    builder.addCase(fetchMyRechargeCredit.fulfilled, (state, action) => {
      state.myRechargeItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyRechargeCredit.rejected, (state) => {
      state.status = Status.ERROR;
      state.myRechargeItem = [];
    });

    builder.addCase(fetchMyTradeRequest.pending, (state) => {
      state.status = Status.LOADING;
      state.myTradeRequestItem = [];
    });
    builder.addCase(fetchMyTradeRequest.fulfilled, (state, action) => {
      state.myTradeRequestItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyTradeRequest.rejected, (state) => {
      state.status = Status.ERROR;
      state.myTradeRequestItem = [];
    });

    builder.addCase(fetchMyNotification.pending, (state) => {
      state.status = Status.LOADING;
      state.myNotificationItem = [];
    });
    builder.addCase(fetchMyNotification.fulfilled, (state, action) => {
      state.myNotificationItem = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMyNotification.rejected, (state) => {
      state.status = Status.ERROR;
      state.myNotificationItem = [];
    });

    builder.addCase(postLounge.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postLounge.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(postLounge.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(postLoungeFlag.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postLoungeFlag.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(postLoungeFlag.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(postMyGift.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postMyGift.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(postMyGift.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(postMyStore.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(postMyStore.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(postMyStore.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(postLoungeComment.pending, (state) => {
      // state.status = Status.LOADING
    });
    builder.addCase(postLoungeComment.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.LoungeComment = action.payload;
    });
    builder.addCase(postLoungeComment.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(postThankyou.pending, (state) => {
      state.tstatus = TStatus.LOADING;
    });
    builder.addCase(postThankyou.fulfilled, (state, action) => {
      state.tstatus = TStatus.SUCCESS;
      state.ThanksData = action.payload;
    });
    builder.addCase(postThankyou.rejected, (state) => {
      state.tstatus = TStatus.ERROR;
    });

    builder.addCase(postBookMark.pending, (state) => {
      state.bstatus = BStatus.LOADING;
    });
    builder.addCase(postBookMark.fulfilled, (state, action) => {
      state.bstatus = BStatus.SUCCESS;
      state.BookMark = action.payload;
    });
    builder.addCase(postBookMark.rejected, (state) => {});
    builder.addCase(sendDmMessage.pending, (state) => {
      state.tagItems = [];
    });
    builder.addCase(sendDmMessage.fulfilled, (state, action) => {
      state.tagItems = action.payload;
    });
    builder.addCase(sendDmMessage.rejected, (state) => {
      state.tagItems = [];
    });
    builder.addCase(fetchUserMessage.pending, (state) => {
      state.getChatMsgItem = [];
    });
    builder.addCase(fetchUserMessage.fulfilled, (state, action) => {
      state.getChatMsgItem = action.payload;
    });
    builder.addCase(fetchUserMessage.rejected, (state) => {
      state.getChatMsgItem = [];
    });
  },
});

export const {
  setItems,
  setStickyItem,
  setSortByTime,
  setItemDetail,
  /*  setMwQuality,
  setTopMousewaiter, */
  setmyStoreItem,
  setmyRechargeItem,
  setuserItem,
  setmyHistoryItem,
  setmyColectionItem,
  setgetProfileItem,
  setmyTradeRequestItem,
  setLoungeComment,
  addSticker,
  setmyNotificationItem,
} = loungesSlice.actions;

export default loungesSlice.reducer;
