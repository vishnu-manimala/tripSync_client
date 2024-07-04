import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisRidesRoutingModule } from './publis-rides-routing.module';
import { MapComponent } from './map/map.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { PublishPaymentComponent } from './publish-payment/publish-payment.component';
import { PublishRideComponent } from './publish-ride/publish-ride.component';
import { PublishRideListComponent } from './publish-ride-list/publish-ride-list.component';
import { RequestModalComponent } from './request-modal/request-modal.component';


@NgModule({
  declarations: [
    MapComponent,
    AutocompleteComponent,
    PublishPaymentComponent,
    PublishRideComponent,
    PublishRideListComponent,
    RequestModalComponent
  ],
  imports: [
    CommonModule,
    PublisRidesRoutingModule
  ]
})
export class PublisRidesModule { }
