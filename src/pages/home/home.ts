import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dateNow: Date;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.dateNow = new Date()
  }

}
