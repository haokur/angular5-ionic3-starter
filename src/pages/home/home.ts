import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Rx";
import { counterState, CounterTypes } from '../../store/modules/counter/counter';
import { StoreService } from '../../store/store.service';
import { HaokurBasePage, PageLoad, PageEnter } from '../default/haokur-base/haokur-base';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends HaokurBasePage implements PageLoad, PageEnter {

  count$: any;
  userInfo$: any;

  dateNow: Date;
  imgList: Array<String> = []

  constructor(
    public api: ApiService,
    private store: Store<counterState>,
    private stateGetter: StoreService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
    super();
    this.count$ = stateGetter.getShopCartNum$()
    this.userInfo$ = stateGetter.getUserInfo$()
  }

  pageLoad() {
    this.loadingStart()
    this.dateNow = new Date()

    this.getZhihuTest()
    this.getApiTest()

    this.toast('提示信息')

    // this.alert()
    //   .then(() => {
    //     console.log(1)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    // this.confirm()
    //   .then(()=>{
    //     console.log('确认')
    //   })
    //   .catch(()=>{
    //     console.log('取消')
    //   })

  }

  pageEnter() {
    console.log('每次进入页面进入可视区域都将执行')
  }

  initLoadingCtrl() {
    return this.loadingCtrl
  }

  initAlertCtrl() {
    return this.alertCtrl
  }

  getZhihuTest() {
    this.api.get({
      act: '4/news/latest'
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getApiTest() {
    this.api.get({
      act: 'http://gank.io/api/random/data/福利/10'
    })
      .then(res => {
        if (res.error === false) {
          this.imgList = res.results.map(item => item.url)
        }
        console.log(this.imgList)
        this.loadingEnd();
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
