import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { sendOtpResponse } from 'src/app/models/api.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  otpLoginForm:FormGroup;
  error:string = "";
  response!: sendOtpResponse;
constructor(private _router:Router,private _formlogin:FormBuilder, private _authService:AuthService){

  this.otpLoginForm = this._formlogin.group({
    phone: this._formlogin.control("", Validators.compose([Validators.required,Validators.pattern(/^\d{10}$/),Validators.minLength(10)])),
  })
}

  navigateToLoginWithPassword() {
    this._router.navigate(['auth/login.password'])
  }

  sendOtp(){
 if(this.otpLoginForm.valid){
      console.log(this.otpLoginForm.value);
      this._authService.sendOtp(this.otpLoginForm.value).subscribe((result:sendOtpResponse)=>{
        console.log(result);
       this.response = result;
        if(this.response.status === 'Success'){
          this._router.navigate(['auth/verify.otp'],{ queryParams: { phone: this.response.data } });
        }else{
          this.error = this.response.message;
        }
      })
    }
  }
}
