import axios, { AxiosResponse } from 'axios';
import { FetchProfileType } from '../redux/lounges/slice';
import { Lounge, MyStore } from '../redux/lounges/types';
import request from '../utils/request';
import { GET_PROFILE_API } from '../constants';

export const getProfileApi = async ({ key }: FetchProfileType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');

  const { data } = await request
    .get<MyStore[]>(GET_PROFILE_API, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
