import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisRidesRoutingModule } from './publis-rides-routing.module';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    PublisRidesRoutingModule
  ]
})
export class PublisRidesModule { }
