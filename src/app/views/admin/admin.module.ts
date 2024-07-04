import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReviewComponent } from './review/review.component';
import { RidesComponent } from './rides/rides.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ViewDocModalComponent } from './users/view-doc-modal/view-doc-modal.component';


@NgModule({
  declarations: [
    AdminComponent,
    ReviewComponent,
    RidesComponent,
    UsersComponent,
    VehiclesComponent,
    ViewDocModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
  ]
})
export class AdminModule { }
