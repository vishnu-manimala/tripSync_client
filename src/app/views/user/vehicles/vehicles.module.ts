import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { AddImagesComponent } from './add-images/add-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';


@NgModule({
  declarations: [
    VehiclesComponent,
    AddVehicleComponent,
    AddRegistrationComponent,
    AddInsuranceComponent,
    AddImagesComponent,
    ViewVehicleComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VehiclesModule { }
