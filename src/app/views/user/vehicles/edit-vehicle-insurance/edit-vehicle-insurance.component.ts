import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/models/api.models';
import { SingleVehicleResponse, Vehicle, Vehicleresponse } from 'src/app/models/vehicle_response.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit-vehicle-insurance',
  templateUrl: './edit-vehicle-insurance.component.html',
  styleUrls: ['./edit-vehicle-insurance.component.css']
})
export class EditVehicleInsuranceComponent {
  insuranceData:FormGroup;
  error:boolean = false;
  errorMessage:string = "";
  private _insuranceSubscription!:Subscription;
  private _vehicleDetailsSubscription!:Subscription;
  id:string | null= "";
  vehicle!:Vehicle;

  constructor(private _form:FormBuilder, private _vehicleService:VehicleService, private _router:Router, private _route:ActivatedRoute){
    this.insuranceData = this._form.group({
      insuranceCompany:this._form.control("",Validators.required),
      policyNumber:this._form.control("",Validators.required),
      expiryDate:this._form.control("",Validators.required)
    })
  }
  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    })
    this._vehicleDetailsSubscription = this._vehicleService.getVehicleData(this.id).subscribe((result: SingleVehicleResponse) => {
      if(result.status === "Success"){
        this.vehicle = result.data;
      }
    })
  }
  submitInsuranceData(){
    if(this.insuranceData.valid){

      this._insuranceSubscription = this._vehicleService.updateInsuranceData(this.insuranceData.value,this.id).subscribe((result: ApiResponse)=>{
        if(result.status == "Success"){
          this._router.navigate(['user/vehicles/view.vehicle'],{ queryParams: { id: this.id } })
        }else{
          //show tost or modal
        }
      })
    }
  }
  cancel(){
    //add model here
    this._router.navigate(['user/vehicles/view.vehicle'],{ queryParams: { id: this.id } })
  }
  ngOnDestroy(): void {
    if (this._insuranceSubscription) {
      this._insuranceSubscription.unsubscribe();
    }
  }
}
