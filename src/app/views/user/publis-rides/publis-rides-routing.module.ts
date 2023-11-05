import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { PublisRidesComponent } from './publis-rides.component';

const routes: Routes = [
  {path:'',component:PublisRidesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublisRidesRoutingModule { }
