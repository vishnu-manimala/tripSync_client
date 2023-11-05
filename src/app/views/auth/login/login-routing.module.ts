import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { VerifyLoginOtpComponent } from './verify-login-otp/verify-login-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login.password',component:LoginPasswordComponent},
  {path:'verify.otp',component:VerifyLoginOtpComponent},
  {path:'forgot.password',component:ForgotPasswordComponent},
  {path:'reset.password',component:ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
