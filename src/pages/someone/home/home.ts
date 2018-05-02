import { Component } from '@angular/core';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

import { HaokurBasePage, PageLoad, PageEnter } from '../../default/haokur-base/haokur-base';

import { ApiService } from '../../../providers/api.service';
import { ImgService } from '../../../providers/img.service';

import { Store } from '@ngrx/store';
import { counterState, CounterTypes } from '../../../store/modules/counter/counter';
import { StoreService } from '../../../store/store.service';

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
    private imgService: ImgService,
  ) {
    super();
    this.count$ = this.stateGetter.getShopCartNum$()
    this.userInfo$ = this.stateGetter.getUserInfo$()
  }

  pageLoad() {
    // this.loadingStart()
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

    // axios.get('/user/list')
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    this.api.get({
      act: 'user/list',
      page: 1,
      // _disableMock:true,
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    this.api.post({
      act: 'user/add'
    })
      .then(res => {
        console.log(res)
      })
  }

  pageEnter() {
    // console.log('每次进入页面进入可视区域都将执行')
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
        // console.log(res)
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
        // console.log(this.imgList)
        this.loadingEnd();
      })
      .catch(err => {
        console.log(err)
      })
  }

  increment() {
    this.store.dispatch({ type: CounterTypes.INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: CounterTypes.DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: CounterTypes.RESET });
  }

  showChoosePicAction() {
    this.imgService.packAllProcess({
      maximumImagesCount: 1,
      quality: 25,
    }, (tempUrl, type) => {
      console.log(tempUrl, type)
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }


}
