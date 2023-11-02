import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  formOtp:FormGroup;
  constructor(private _forms:FormBuilder, private _router:Router){
    this.formOtp = this._forms.group({
      otp: this._forms.control("", Validators.compose([Validators.minLength(4), Validators.maxLength(4),Validators.required])),
    })
  }
  verifyOtp(){}

}
