import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { AddImagesComponent } from './add-images/add-images.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';

const routes: Routes = [
  {path:'',component:VehiclesComponent},
  {path:'add.vehicle', component:AddVehicleComponent},
  {path:'add.registration', component:AddRegistrationComponent},
  {path:'add.insurance', component:AddInsuranceComponent},
  {path:'add.images', component:AddImagesComponent},
  {path:'view.vehicle', component:ViewVehicleComponent},
  //{path:'add.registration', component:AddRegistrationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
