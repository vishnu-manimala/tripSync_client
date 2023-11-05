import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRegistrationComponent } from './add-registration/add-registration.component';

const routes: Routes = [
  {path:'',component:VehiclesComponent},
  {path:'add.vehicle', component:AddVehicleComponent},
  {path:'add', component:AddRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
