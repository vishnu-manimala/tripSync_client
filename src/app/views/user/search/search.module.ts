import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ChatComponent } from './chat/chat.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { ViewSearchComponent } from './view-search/view-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { PublisRidesModule } from '../publis-rides/publis-rides.module';


@NgModule({
  declarations: [
    SearchComponent,
    ChatComponent,
    PaymentModalComponent,
    ViewSearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    PublisRidesModule
  ]
})
export class SearchModule { }
