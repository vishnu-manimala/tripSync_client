import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicleresponse } from 'src/app/models/vehicle_response.model';
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
  private _insuranceSubscription!:Subscription;

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
      this._insuranceSubscription = this._vehicleService.saveInsuranceData(this.insuranceData.value).subscribe((result: Vehicleresponse)=>{
        console.log(result);
        if(result.status == "Success"){
          this._router.navigate(['user/vehicles/add.images']);
        }
        else{
          this.error = true;
          this.errorMessage = result.message;
        }
      })
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this._insuranceSubscription) {
      this._insuranceSubscription.unsubscribe();
    }
  }
}
