import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisRidesRoutingModule } from './publis-rides-routing.module';
import { MapComponent } from './map/map.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    MapComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    PublisRidesRoutingModule
  ]
})
export class PublisRidesModule { }
