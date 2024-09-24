import axios, { AxiosResponse } from 'axios';
import { FetchStickerLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getStickerLoungesApi = async ({
  emojiData,
}: FetchStickerLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const ddd = emojiData;
  const token = localStorage.getItem('token');
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/getemoji';
  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);
  return data;
};
