import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";

import { TestPage } from '../../pages/haokur/test/test'
import { HomePage } from "../../pages/home/home";

const Pages = [
  TestPage,
  HomePage
]

@NgModule({
  imports: [
    IonicModule,
    IonicPageModule.forChild(TestPage),
    IonicPageModule.forChild(HomePage),
  ],
  exports: [...Pages],
  declarations: [...Pages],
  providers: []
})

export class HaokurModule { }