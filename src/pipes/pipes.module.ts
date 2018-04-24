import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular/module";

import { dateFormat } from "./date.pipe";

export const Pipes = [
  dateFormat,
]

@NgModule({
  declarations: [
    ...Pipes
    /**--component usage here--*/
  ],
  imports: [IonicModule],
  exports: [
    ...Pipes
    /**--component usage here--*/
  ]
})

export class PipesModule { }