import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { UserComponent } from './layouts/user/user.component';

const routes: Routes = [
{path:'auth',
component:AuthComponent,
children:[
  {path:'',
  loadChildren:()=>import('./views/auth/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'register',
    loadChildren:()=>import('./views/auth/register/register.module').then(m=>m.RegisterModule)
  }
]
},
{path:'user',component:UserComponent,
children:[
  
  {
    path:'vehicles',
    loadChildren:()=>import('./views/user/vehicles/vehicles.module').then(m=>m.VehiclesModule)
  },
  {
    path:'rides',
    loadChildren:()=>import('./views/user/rides/rides.module').then(m=>m.RidesModule)
  },
  {
    path:'publish.rides',
    loadChildren:()=>import('./views/user/publis-rides/publis-rides.module').then(m=>m.PublisRidesModule)
  }
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
