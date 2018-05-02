import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";

import { TabBarPage } from "./tab-bar/tab-bar";

const Pages = [
  TabBarPage,
]

@NgModule({
  imports: [
    IonicModule,
    IonicPageModule.forChild(TabBarPage),
  ],
  exports: [...Pages],
  declarations: [...Pages],
  providers: []
})

export class DefaultModule { }