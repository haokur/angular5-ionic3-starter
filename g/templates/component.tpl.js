// 组件.ts模板
function getComponentText(createName,ModuleName){
    return `import { Component, Input ,Output ,EventEmitter } from "@angular/core";
import { NavController } from 'ionic-angular';

@Component({
  selector: "${createName}",
  template: \`
    ${createName}组件内容
  \`,
})
export class ${ModuleName} {
  @Input() config;
  @Output() onSuccess = new EventEmitter<any>();

  constructor(
    public navCtrl:NavController
  ){

  }

  onEmit(){
    this.onSuccess.emit(true);
  }
}
`
}

module.exports = {
    getComponentText
}
// 组件索引 index.ts模板
// export var componentExportIndex = `
// export * from './${createName}.component'
// `

 