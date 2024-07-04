import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { PublisRidesComponent } from './publis-rides.component';
import { PublishRideListComponent } from './publish-ride-list/publish-ride-list.component';
import { PublishRideComponent } from './publish-ride/publish-ride.component';
import { PublishRouteComponent } from './publish-route/publish-route.component';
import { PublishVehicleComponent } from './publish-vehicle/publish-vehicle.component';
import { PublishPaymentComponent } from './publish-payment/publish-payment.component';
import { PublishSettingComponent } from './publish-setting/publish-setting.component';
import { PublishSuccessComponent } from './publish-success/publish-success.component';

const routes: Routes = [
  {path:'',component:PublishRideListComponent},
  {path:'add.ride',component:PublishRideComponent},
  {path:'add.route',component:PublishRouteComponent},
  {path:'add.vehicle',component:PublishVehicleComponent},
  {path:'add.payment',component:PublishPaymentComponent},
  {path:'add.config',component:PublishSettingComponent},
  {path:'add.success',component:PublishSuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublisRidesRoutingModule { }
