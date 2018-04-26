import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";

import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { DirectivesModule } from "../../directives/directives.module";

import { TestPage } from '../../pages/haokur/test/test'
import { HomePage } from "../../pages/home/home";
import { ApiService } from "../../providers/api.service";
import { StoreService } from "../../store/store.service";

const Pages = [
  TestPage,
  HomePage
]

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(TestPage),
    IonicPageModule.forChild(HomePage),
  ],
  exports: [...Pages],
  declarations: [...Pages],
  providers: [ApiService, StoreService]
})

export class HaokurModule { }