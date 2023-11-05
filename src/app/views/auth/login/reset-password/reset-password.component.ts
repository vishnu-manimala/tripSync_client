import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { sendOtpResponse } from 'src/app/models/api.models';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm.password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  error_message: string = "";
  imageUrl:string = '../../../assets/tp.png';
  param:string= "";
  private resetPasswordSubscription!: Subscription ;

  constructor(private _form:FormBuilder,private  _route:ActivatedRoute ,private _authService:AuthService, private _router:Router){
    this.resetForm = this._form.group({
      otp: this._form.control("", Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(4)])),
      password: this._form.control("", Validators.compose([Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.required])),
      confirm_password:this._form.control("",Validators.required)
    },{
      validators: [confirmPasswordValidator('password', 'confirm_password')]
    });
  }
  
  ngOnInit() {
     this._route.queryParams.subscribe(params=>{
      this.param = params['phone'];
      console.log("param",this.param)
    })
  }
  
    

  navigation(url:string){
      this._router.navigate([url]);
  }
  reset(){
    console.log(this.resetForm);
    if(this.resetForm.valid){
    this.resetPasswordSubscription = this._authService.resetPassword(this.resetForm.value,this.param).subscribe((result:sendOtpResponse)=>{
          console.log(result);
        if(result.status === 'Success'){
          this._router.navigate(['auth'])
        }
      })
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.resetPasswordSubscription){
      this.resetPasswordSubscription.unsubscribe();
    }
  }
}
