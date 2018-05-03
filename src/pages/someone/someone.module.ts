import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";

import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";
import { PipesModule } from "../../pipes/pipes.module";

import { HomePage } from "./home/home";

const Pages = [
  HomePage,
]

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
  declarations: [
    ...Pages,
  ],
  entryComponents: [
    ...Pages,
  ],
  providers: []
})

export class SomeOneModule { }