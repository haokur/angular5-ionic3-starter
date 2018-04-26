import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Rx";
import { counterState, CounterTypes } from '../../store/modules/counter/counter';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  count$: any;
  userInfo$: any;

  dateNow: Date;
  imgList: Array<String> = []

  constructor(
    public api: ApiService,
    private store: Store<counterState>,
    private stateGetter: StoreService,
  ) {
    this.count$ = stateGetter.getShopCartNum$()
    this.userInfo$ = stateGetter.getUserInfo$()
  }

  ngOnInit() {
    this.dateNow = new Date()

    this.api.get({
      act: '4/news/latest'
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    this.api.get({
      act: 'http://gank.io/api/random/data/福利/10'
    })
      .then(res => {
        if (res.error === false) {
          this.imgList = res.results.map(item => item.url)
        }
        console.log(this.imgList)
      })
      .catch(err => {
        console.log(err)
      })

  }

  increment() {
    console.log(this.count$)
    this.store.dispatch({ type: CounterTypes.INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: CounterTypes.DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: CounterTypes.RESET });
  }



}
