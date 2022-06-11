import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementComponent } from './increment/increment.component';
import { DonaGraphicsComponent } from './dona-graphics/dona-graphics.component';

@NgModule({
  declarations: [
    IncrementComponent,
    DonaGraphicsComponent
  ],
  exports: [
    IncrementComponent,
    DonaGraphicsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})

export class ComponentsModule { }
