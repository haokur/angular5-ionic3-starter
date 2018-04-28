import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabBarPage } from '../pages/default/tab-bar/tab-bar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabBarPage;
  readySource: String = '';

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) { }

  ngOninit() {
    this.platform.ready()
      .then((readySource) => {
        this.readySource = readySource;
        if (readySource === 'cordova') { // app打开打开
          this.nativeReady();
        }
        else if (readySource === 'dom') { // 网页浏览器打开
          this.webReady();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  // native app 中启动
  nativeReady() {
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    this.commonReady();
  }

  // web 浏览器中启动
  webReady() {

    this.commonReady();
  }

  // native 和 web 浏览器都要执行的操作
  commonReady() {
    this.initEntry();
  }

  // 初始化入口,区分开懒加载页面
  initEntry() {
    if (window.location.href.indexOf('#') === -1) {
      this.rootPage = TabBarPage
    }
  }


}

