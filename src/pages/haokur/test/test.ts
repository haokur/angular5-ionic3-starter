import { Component } from "@angular/core";

@Component({
  selector: "test",
  templateUrl: "test.html"
})

export class TestPage {

  constructor() {
    console.log('测试页面')
  }
}