import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { UserComponent } from './layouts/user/user.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { isLoggedOutGuard } from './guards/is-logged-out.guard';
import { HomeComponent } from './layouts/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';

const routes: Routes = [
{
  path:'',component:HomeComponent,canActivate:[isLoggedOutGuard]
},
{path:'auth',
component:AuthComponent,
canActivate:[isLoggedOutGuard],
children:[
  {path:'',
  loadChildren:()=>import('./views/auth/login/login.module').then(m=>m.LoginModule),
  canActivate:[isLoggedOutGuard]
  },
  {
    path:'register',
    loadChildren:()=>import('./views/auth/register/register.module').then(m=>m.RegisterModule),
    canActivate:[isLoggedOutGuard]
  }
]
},
{path:'user',
component:UserComponent,
canActivate:[authGuard,roleGuard],
data:{role:'user'},
children:[
  
  {
    path:'vehicles',
    loadChildren:()=>import('./views/user/vehicles/vehicles.module').then(m=>m.VehiclesModule),
    canActivate:[authGuard,roleGuard],
    data:{role:'user'}
  },
  {
    path:'rides',
    loadChildren:()=>import('./views/user/rides/rides.module').then(m=>m.RidesModule),
    canActivate:[authGuard,roleGuard],
    data:{role:'user'}
  },
  {
    path:'publish.rides',
    loadChildren:()=>import('./views/user/publis-rides/publis-rides.module').then(m=>m.PublisRidesModule),
    canActivate:[authGuard,roleGuard],
    data:{role:'user'}
  },
  {
    path:'profile',
    loadChildren:()=>import('./views/user/profile/profile.module').then(m=>m.ProfileModule),
    canActivate:[authGuard,roleGuard],
    data:{role:'user'}
  },
  {
    path:'',
    loadChildren:()=>import('./views/user/accounts/accounts.module').then(m=>m.AccountsModule),
    canActivate:[authGuard,roleGuard],
    data:{role:'user'}
  },
  {
    path:'search',
    loadChildren:()=>import('./views/user/search/search.module').then(m=>m.SearchModule),
    canActivate:[authGuard,roleGuard],
    data:{role:'user'}
  }
]
},
{
  path:'admin',component:AdminComponent,
  children:[{
    path:"",
    loadChildren:()=>import('./views/admin/admin.module').then(m=>m.AdminModule)
  }
  ]
},
{path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
