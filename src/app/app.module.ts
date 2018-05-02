import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { APP_CONFIG } from '../config'

// users-module
import { UsersModule } from '../pages/users.module';

// users-service
import { ApiService } from '../providers/api.service';
import { StoreService } from '../store/store.service';
import { ImgService } from '../providers/img.service';
import { SocialService } from '../providers/social.service';

// store
import { STORE } from '../store/index'
import { ENV } from '../config/env';

// 开启 mock 数据模拟
import { MockServer } from '../mock/mock'
if (ENV==='development') {
  MockServer.bootstrap();
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, APP_CONFIG),
    ...STORE,
    ...UsersModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    StoreService,
    ImgService,
    SocialService,
    ImagePicker,
    FileTransfer,
    Crop,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
