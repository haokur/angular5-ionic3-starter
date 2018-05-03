import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";
import { PipesModule } from "../../pipes/pipes.module";

/**--import page--*/
import { TestPage } from "./test/test";

const Pages = [
  /*--declaration page--*/
  TestPage,
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

export class HaokurModule { }