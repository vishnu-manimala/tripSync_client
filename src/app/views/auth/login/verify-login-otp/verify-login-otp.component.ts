import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { verifyOtpResponse } from 'src/app/models/api.models';
import { UserRole } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-verify-login-otp',
  templateUrl: './verify-login-otp.component.html',
  styleUrls: ['./verify-login-otp.component.css']
})
export class VerifyLoginOtpComponent {
  formOtp:FormGroup;
  error_message:string = "";
  param:string | null = "";
  imageUrl:string = '../../../assets/tp.png'
  userdata!: verifyOtpResponse;
  private verifyLoginSubscription!:Subscription;

  constructor(private _forms:FormBuilder,private _jwt:JwtService, private _router:Router, private _authService:AuthService, private _route:ActivatedRoute){

    this._route.queryParams.subscribe(params=>{
      this.param = params['phone'];
      console.log("vab",this.param);
  })
    this.formOtp = this._forms.group({
      otp: this._forms.control("", Validators.compose([Validators.minLength(4), Validators.maxLength(4),Validators.required])),
    })
  }
  verifyOtp(){
   
    this.verifyLoginSubscription = this._authService.verifyOtp(this.formOtp.value,this.param).subscribe((result: any) => {
      console.log(result);
      this.userdata = result;
      if (this.userdata.status === "Success") {
        let role: UserRole = this.userdata.data.isAdmin ? UserRole.Admin : UserRole.User;
        this._jwt.setToken(this.userdata.token);
       this._jwt.setRole(role);
       this._jwt.setLocal(this.userdata.data);
       console.log("success");
       this._router.navigate(['user'])
        } else {
          this.error_message = "something went wrong"
          this._router.navigate(['auth/login.password']);
        }
    })
  }

  
  navigateToLoginWithPassword(){
    this._router.navigate(['auth/login.password'])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.verifyLoginSubscription){
      this.verifyLoginSubscription.unsubscribe();
    }
  }
}
