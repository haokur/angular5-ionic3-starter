import { Component } from "@angular/core";
import { StoreService } from "../../../store/store.service";
import { HaokurBasePage } from "../../default/haokur-base/haokur-base";

@Component({
  selector: "test",
  templateUrl: "test.html"
})

export class TestPage extends HaokurBasePage {

  count$;

  constructor(
    private stateGetter: StoreService
  ) {
    super();
  }

  pageLoad() {
    this.log('测试页面')
    this.count$ = this.stateGetter.getShopCartNum$()
  }

  pageEnter() {
    this.log('每次切入必现')
  }

}