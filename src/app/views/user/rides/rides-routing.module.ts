import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesComponent } from './rides.component';

const routes: Routes = [
  {path:'',component:RidesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RidesRoutingModule { }
