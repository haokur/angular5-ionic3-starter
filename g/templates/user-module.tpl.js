function getUserModuleTpl(userName) {
	let _userModule = userName.substring(0, 1).toUpperCase() + userName.substring(1, userName.length)
	return `import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';

import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";
import { PipesModule } from "../../pipes/pipes.module";

/**--import page--*/

const Pages = [
  /*--declaration page--*/
]

@NgModule({
	imports: [
		IonicModule,
		ComponentsModule,
		DirectivesModule,
		PipesModule,
  ],
	declarations: [
    ...Pages,
  ],
	entryComponents: [
		...Pages,
	],
	providers: []
})
export class ${_userModule}Module {}
`
}

module.exports = {
	getUserModuleTpl
}