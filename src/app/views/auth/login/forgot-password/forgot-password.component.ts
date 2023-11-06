import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { sendOtpResponse } from 'src/app/models/api.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  imageUrl: String = "";
  resetPassord!: FormGroup;
  response!: sendOtpResponse;
  error: string = "";
private forgotPasswordSubscription!:Subscription;

  constructor(private _router: Router, private _form: FormBuilder, private _authService: AuthService,private _toaster:ToastrService) { }
  ngOnInit(): void {
    this.resetPassord = this._form.group({
      phone: this._form.control("", Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)])),
    })
  }

  navigation(url: string) {
    this._router.navigate([url]);
  }

  submit() {
    if (this.resetPassord.valid) {
      this.forgotPasswordSubscription = this._authService.sendOtp(this.resetPassord.value).subscribe((result: sendOtpResponse) => {
        console.log(result);
        this.response = result;
        if (this.response.status === 'Success') {
          this._toaster.success('OTP send!')
          this._router.navigate(['auth/reset.password'], { queryParams: { phone: this.response.data } });
        } else {
          this._toaster.error(this.response.message)
          this.error = this.response.message;
        }
      })
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.forgotPasswordSubscription){
      this.forgotPasswordSubscription.unsubscribe();
    }
  }
}
