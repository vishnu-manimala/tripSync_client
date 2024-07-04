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
import { EditVehicleBasicComponent } from './edit-vehicle-basic/edit-vehicle-basic.component';
import { EditVehicleInsuranceComponent } from './edit-vehicle-insurance/edit-vehicle-insurance.component';
import { EditVehicleRegistrationComponent } from './edit-vehicle-registration/edit-vehicle-registration.component';


@NgModule({
  declarations: [
    VehiclesComponent,
    AddVehicleComponent,
    AddRegistrationComponent,
    AddInsuranceComponent,
    AddImagesComponent,
    ViewVehicleComponent,
    EditVehicleBasicComponent,
    EditVehicleInsuranceComponent,
    EditVehicleRegistrationComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VehiclesModule { }
