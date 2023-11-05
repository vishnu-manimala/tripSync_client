import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.css']
})

export class AddRegistrationComponent {
  registrationData:FormGroup;
  errorMessage:string = "";
  error:boolean=false;
  responseData:any;
  constructor(private _form:FormBuilder, private _vehicleService:VehicleService, private _router:Router){
    this.registrationData = this._form.group({
      registrationNumber:this._form.control("",Validators.required),
      expiryDate:this._form.control("",Validators.required)
    })
  }

  submitRegistrationData(){
    console.log(this.registrationData.value)
    if(this.registrationData.valid){
      this._vehicleService.saveRegistrationData(this.registrationData.value).subscribe((result:any)=>{
        console.log(result);
        this.responseData = result;
        if(this.responseData.status == "Success"){
          this._router.navigate(['add.vehicle.insurance']);
        }else{
          this.errorMessage = this.responseData.message ;
          this.error=true;
        }
      })
    }else{
      this.errorMessage = "Data is not valid";
      this.error=true;
    }
  }

}
