
import { StoreModule } from '@ngrx/store'

import { counterReducer } from './modules/counter/counter.reducer'
import { ICounter } from './modules/counter/counter.interface'

// reducer 集合
export const AppReducers = {
  count: counterReducer,
};

// state 集合
export interface AppState {
  count: ICounter
}

// store module 
export const STORE = [StoreModule.forRoot(AppReducers)];