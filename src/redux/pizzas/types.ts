export type Pizza = {
  id: string,
  price: number,
  title: string,
  imageUrl: string,
  sizes: number[],
  types: number[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
export interface PizzasSliceState {
  status: Status,
  items: Pizza[]
}