import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicleresponse } from 'src/app/models/vehicle_response.model';
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
  responseData!:Vehicleresponse;
  private _registrationSubscription!:Subscription;


  constructor(private _form:FormBuilder, private _vehicleService:VehicleService, private _router:Router){
    this.registrationData = this._form.group({
      registrationNumber:this._form.control("",Validators.required),
      expiryDate:this._form.control("",Validators.required)
    })
  }

  submitRegistrationData(){
    console.log(this.registrationData.value)
    if(this.registrationData.valid){
      this._registrationSubscription = this._vehicleService.saveRegistrationData(this.registrationData.value).subscribe((result:Vehicleresponse)=>{
        console.log(result);
        this.responseData = result;
        if(this.responseData.status == "Success"){
          this._router.navigate(['user/vehicles/add.insurance']);
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this._registrationSubscription){
      this._registrationSubscription.unsubscribe();
    }
  }

}
