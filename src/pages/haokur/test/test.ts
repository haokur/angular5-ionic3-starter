import { Component } from "@angular/core";
import { NavController, NavParams, Events, LoadingController, ToastController } from "ionic-angular";

@Component({
  selector: "test",
  templateUrl: "test.html"
})

export class TestPage {

  constructor(){
    console.log('测试页面')
  }
}