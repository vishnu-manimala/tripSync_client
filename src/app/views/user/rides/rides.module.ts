import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RidesRoutingModule } from './rides-routing.module';
import { RidesComponent } from './rides.component';


@NgModule({
  declarations: [
    RidesComponent
  ],
  imports: [
    CommonModule,
    RidesRoutingModule
  ]
})
export class RidesModule { }
