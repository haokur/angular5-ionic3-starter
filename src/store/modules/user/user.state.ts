// interface
export interface IUser {
  name: string;
  age: number | string;
}

// state
export interface userState {
  name: string;
  age: number | string;
}

export const initUserState: userState = {
  name: '匿名',
  age: '保密'
}