import { Component } from "@angular/core";

import { HomePage } from "../../home/home";
import { TestPage } from "../../haokur/test/test";

@Component({
  selector: "tab-bar",
  templateUrl: "tab-bar.html"
})

export class TabBarPage {
  homePage: any = HomePage
  shopPage: any = TestPage;
  worksPage: any = HomePage;
  myPage: any = TestPage;


}