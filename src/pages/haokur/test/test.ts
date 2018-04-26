import { Component } from "@angular/core";
import { AppState } from "../../../store/state";
import { Store } from "@ngrx/store";
import { GetterService } from "../../../store/getters";

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