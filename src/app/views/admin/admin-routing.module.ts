import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RidesComponent } from './rides/rides.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {
    path:'',component:AdminComponent
  },
  {
    path:'users',component:UsersComponent
  },
  {
    path:'vehicles',component:VehiclesComponent
  },
  {
    path:'rides',component:RidesComponent
  },
  {
    path:'reviews',component:ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
