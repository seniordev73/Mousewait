import axios from 'axios';
import { FetchPizzasType } from '../redux/pizzas/slice';
import { Pizza } from '../redux/pizzas/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllPizzasApi = async ({
  sortType,
  categoryId,
  currentPage,
  searchValue,
}: FetchPizzasType) => {
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/home';
  let searchByCategory = categoryId > 0 ? `&category=${categoryId}` : '';
  const { data } = await axios.get<Pizza[]>(
    `${apiEndpoint}/items?sortBy=${sortType.sortProperty}${searchByCategory}&order=asc&page=${currentPage}&limit=8&search=${searchValue}`
  );
  return data;
};
