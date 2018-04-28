
import { StoreModule } from '@ngrx/store'

import { ICounter, counterReducer } from './modules/counter/counter'
import { userReducer, IUser } from './modules/user/user';

// reducer 集合
export const AppReducers = {
  count: counterReducer,
  user: userReducer,
};

// state 集合
export interface AppState {
  count: ICounter,
  user: IUser
}

// store module 
export const STORE = [StoreModule.forRoot(AppReducers)];