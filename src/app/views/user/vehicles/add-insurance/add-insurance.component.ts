import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css']
})
export class AddInsuranceComponent {
  insuranceData:FormGroup;
  error:boolean = false;
  errorMessage:string = "";
  constructor(private _form:FormBuilder, private _vehicleService:VehicleService, private _router:Router){
    this.insuranceData = this._form.group({
      insuranceCompany:this._form.control("",Validators.required),
      policyNumber:this._form.control("",Validators.required),
      expiryDate:this._form.control("",Validators.required)
    })
  }
 
  submitInsuranceData(){
    console.log(this.insuranceData.value);
    if(this.insuranceData.valid){
      this._vehicleService.saveInsuranceData(this.insuranceData.value).subscribe((result: any)=>{
        console.log(result);
        if(result.status == "Success"){
          this._router.navigate([['add.vehicle.photos']]);
        }
        else{
          this.error = true;
          this.errorMessage = result.message;
        }
      })
    }
  }
}
