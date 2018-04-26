/**
 * 状态管理服务
 */
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { counterState } from './counter.state';
import { AppState } from '../../index';

@Injectable()
export class GetterService {
  constructor(
    public store: Store<AppState>,
  ) {

  }

  getShopCartNum$() {
    // console.log(this.store.pipe(select('count')).count)
    // return this.store.pipe(select('count')).count;
    return this.store.select(state => {
      // console.log(state)
      // console.log(state.count)
      return state.count.num;
    })
    // return 1;
  }

}


// export const getCount = (state: counterState) => state.count;

// store.pipe(select('count'));


// export const getBookEntitiesState = createSelector(
//   getBooksState,
//   state => state.books
// );

// export const getSelectedBookId = createSelector(
//   fromBooks.getSelectedId
// );