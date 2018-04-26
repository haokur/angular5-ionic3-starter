import { StoreModule, combineReducers, ReducerManagerDispatcher } from '@ngrx/store'

import { Reducers } from './reducers'

// const hasCombinedReducers = combineReducers(Reducers);

// console.log(Reducers)
// console.log(hasCombinedReducers)

// export function reducer(state: any, action: any) {
//   return hasCombinedReducers(state, action);
// }

let modules = [StoreModule.forRoot(Reducers)];

export const STORE = modules;