export type SortType = {
  name: string,
  sortProperty: 'rating' | 'title' | 'price',
}

export interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sortType: SortType
}