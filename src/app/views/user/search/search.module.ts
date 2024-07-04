import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ChatComponent } from './chat/chat.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { ViewSearchComponent } from './view-search/view-search.component';


@NgModule({
  declarations: [
    SearchComponent,
    ChatComponent,
    PaymentModalComponent,
    ViewSearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
