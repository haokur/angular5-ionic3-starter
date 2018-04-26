import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store";
import { GetterService } from "../../../store/modules/counter/counter.getter";

@Component({
  selector: "test",
  templateUrl: "test.html"
})

export class TestPage {

  count$;

  constructor(
    private store:Store<AppState>,
    private stateGetter:GetterService
  ) {
    console.log('测试页面')
    this.count$ = stateGetter.getShopCartNum$()
  }
}