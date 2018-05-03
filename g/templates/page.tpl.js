var config = require("../config");

// 页面模板
function getPageText(createName, moduleName) {
  return `import { Component } from '@angular/core';
import { NavController , NavParams } from 'ionic-angular';
import { HaokurBasePage } from "../../default/haokur-base/haokur-base";

import { ApiService } from '../../../providers/api.service';

@Component({
    selector: 'page-${createName}',
    templateUrl: '${createName}.html'
})
export class ${moduleName} extends HaokurBasePage {
    id;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public api: ApiService,
    ) { 
        super();
    }

    ionViewDidLoad(){
        this.id = this.navParams.get('id');
    }

    ionViewDidEnter(){

    }

}
`;
}

function getPageStyle(createName) {
  return `page-${createName}{
    
}
`;
}

function getPageHtml(createName) {
  var userBelong = config.USER;
  return `<ion-header class="${userBelong}">
    <ion-navbar>
        <ion-title>${createName}</ion-title>
    </ion-navbar>
</ion-header>
<ion-content class="${userBelong}">

</ion-content>
    `;
}

module.exports = {
  getPageText,
  getPageStyle,
  getPageHtml
};
