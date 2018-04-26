/**
 * 状态管理服务
 */
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state';

@Injectable()
export class GetterService {
  constructor(
    public store: Store<AppState>,
  ) {

  }

  getShopCartNum$() {
    // state.shopCart.count
    return this.store.pipe(select('count'));
    // return this.store.select(state => {
    //   console.log(state)
    //   console.log(state.counter)
    //   return state.counter.initNum
    // })
  }

}
