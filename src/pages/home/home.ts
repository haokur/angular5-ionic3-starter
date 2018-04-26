import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Rx";
import { INCREMENT, DECREMENT, RESET } from '../../store/reducers/counter';
import { AppState } from '../../store/state';
import { GetterService } from '../../store/getters';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  count$;
  // count$:Observable<number>;

  dateNow: Date;
  imgList: Array<String> = []

  constructor(
    public api: ApiService,
    private store: Store<AppState>,
    private stateGetter: GetterService,
  ) {
    this.count$ = stateGetter.getShopCartNum$()
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
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }



}
