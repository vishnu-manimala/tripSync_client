import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { sendOtpResponse } from 'src/app/models/api.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  otpLoginForm: FormGroup;
  error: string = "";
  imageUrl: string = '../../../assets/tp.png'
  response!: sendOtpResponse;
  private loginSubscription!:Subscription;

  constructor(private _router: Router, private _formlogin: FormBuilder, private _authService: AuthService) {

    this.otpLoginForm = this._formlogin.group({
      phone: this._formlogin.control("", Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)])),
    })
  }

  navigation(url: string) {
    this._router.navigate([url])
  }

  sendOtp() {
    console.log(this.otpLoginForm.value);
    if (this.otpLoginForm.valid) {
      console.log(this.otpLoginForm.value);
     this.loginSubscription =  this._authService.sendOtp(this.otpLoginForm.value).subscribe((result: sendOtpResponse) => {
        console.log(result);
        this.response = result;
        if (this.response.status === 'Success') {
          this._router.navigate(['auth/verify.otp'], { queryParams: { phone: this.response.data } });
        } else {
          this.error = this.response.message;
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }
}
