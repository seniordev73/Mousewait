export type User = {
  [key: string]: any;
  
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface UsersSliceState {
  status: Status;
  items: User[];
}
