import { Component } from "@angular/core";

import { TestPage } from "../../haokur/test/test";
import { HomePage } from "../../someone/home/home";

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