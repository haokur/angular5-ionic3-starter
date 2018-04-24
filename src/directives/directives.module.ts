import { IonicModule } from "ionic-angular/module";
import { NgModule } from "@angular/core";
import { HighlightDirective } from "./highlight.directive";

export const Directives = [
  HighlightDirective
]

@NgModule({
  declarations: [
    ...Directives
    /**--component usage here--*/
  ],
  imports: [IonicModule],
  exports: [
    ...Directives
    /**--component usage here--*/
  ]
})

export class DirectivesModule { }
