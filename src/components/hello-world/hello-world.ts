import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NavController } from 'ionic-angular';

@Component({
  selector: "hello-world",
  templateUrl: 'hello-world.html'
})
export class HelloWorldComponent {
  @Input() amount;
  @Input() userInfo;
  @Output() onMinus = new EventEmitter<any>();

  constructor(
    public navCtrl: NavController
  ) {

  }

  // 减一
  minus() {
    this.onMinus.emit();
  }


}
