import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { sendOtpResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  passwordLogin(data:FormGroup){
    return this._http.post('http://localhost:3001/auth/password_login',data)
   
  }
  registerUser(registerData:FormGroup){
    console.log(registerData);
    return this._http.post('http://localhost:3001/auth/register',registerData)
  }

  sendOtp(data:number|string):any{
    console.log(data);
    return this._http.post('http://localhost:3001/auth/send_otp',data);
  }
  verifyOtp(otp: {otp:string},phone:string|null){
    console.log("otp",otp,"jd",typeof(otp),"phone",phone)
    let data ={ otp:otp.otp,phone:phone }
    return this._http.post('http://localhost:3001/auth/verify_otp',data);
  }
  resetPassword(reset:FormGroup,param:string):any{
    const data = {formData:reset,phone:param}
    return this._http.post('http://localhost:3001/auth/reset_password',data);
  }
}
