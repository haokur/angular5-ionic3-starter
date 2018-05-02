import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";

import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";
import { PipesModule } from "../../pipes/pipes.module";

import { TestPage } from "./test/test";

const Pages = [
  TestPage,
]

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    IonicPageModule.forChild(TestPage),
  ],
  exports: [...Pages],
  declarations: [...Pages],
  providers: []
})

export class HaokurModule { }