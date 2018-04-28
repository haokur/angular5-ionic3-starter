/**
 * 状态管理服务
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './index';

@Injectable()
export class StoreService {
  constructor(
    public store: Store<AppState>,
  ) {

  }

  getShopCartNum$() {
    return this.store.select(state => state.count.num)
  }

  getUserInfo$() {
    return this.store.select(state => state.user)
  }

}

