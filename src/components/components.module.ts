import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';

/**--component import here--*/
import { HelloWorldComponent } from './hello-world/hello-world'
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';

const components = [
  HelloWorldComponent,
]


@NgModule({
  declarations: [
    ...components
    /**--component usage here--*/
  ],
  imports: [IonicModule, PipesModule, DirectivesModule],
  exports: [
    ...components
    /**--component usage here--*/
  ]
})

export class ComponentsModule { }
