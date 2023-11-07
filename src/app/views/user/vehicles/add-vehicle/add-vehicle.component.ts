import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicleresponse } from 'src/app/models/vehicle_response.model';
import { JwtService } from 'src/app/services/jwt.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  vehicleData:FormGroup;
  private _vehicleSubscription!:Subscription;
  brands:any;
  returnData!:Vehicleresponse;
  error:boolean=false;
  errorMessage:string = "";
  models:any;
  years:any;
  constructor(private _form:FormBuilder, private _vehicleService:VehicleService, private _jwt:JwtService, private _router:Router){
    
    this.vehicleData = this._form.group({
      type: this._form.control("", Validators.required),
      brand: this._form.control("", Validators.required),
      model: this._form.control("", Validators.required),
      year: this._form.control("", Validators.required),
      color: this._form.control("", Validators.required)
    })
  }
  onTypeValue(){
    console.log(this.vehicleData.value.type);
    this._vehicleService.getCarBrands(this.vehicleData.value.type).subscribe(result=>{
      this.brands = result
      console.log("types",this.brands.Results);
      this.brands.Results.forEach((element:any) => {
        console.log("carss",element.MakeName)
      });
    })
  }

  async onBrandValue(){
    console.log(this.vehicleData.value.brand);
    const url = 'https://api.api-ninjas.com/v1/cars?make='+`${this.vehicleData.value.brand}`;
    const options = {
      method: 'GET',
    
    headers: { 'X-Api-Key': 'WVH898cupeF73t3B4fElxA==xAuBmwhmgIXFI18K'},
    contentType: 'application/json',
    }
    
    const response:any = await fetch(url,options)
    const model =   await response.json();
    console.log(model);
    this.models = model;
  }

  async onModelValue(){
    const url = 'https://api.api-ninjas.com/v1/cars?model='+`${this.vehicleData.value.model}`;
    const options = {
      method: 'GET',
    
    headers: { 'X-Api-Key': 'WVH898cupeF73t3B4fElxA==xAuBmwhmgIXFI18K'},
    contentType: 'application/json',
    }
    
    const response:any = await fetch(url,options)
    const year =   await response.json();
    console.log(year);
    this.years = year;
  }

  submitVehicleData(){
    console.log(this.vehicleData.value);
  if (this.vehicleData.valid) {
    this._vehicleSubscription = this._vehicleService.saveVehicleData(this.vehicleData.value).subscribe((result:Vehicleresponse) => {
      this.returnData = result;
      console.log(this.returnData);
      if (this.returnData.status === "Success") {
        this._jwt.setToken(this.returnData.token!);console.log("in success")
        this._router.navigate(['user/vehicles/add.registration'])
      } else {
        this.error = true;
        this.errorMessage = this.returnData.message;
      }
    })
  }else{
    this.error = true;
    this.errorMessage = "Form is not valid!";
  }
}

ngOnDestroy(): void {
 
  if(this._vehicleSubscription){
    this._vehicleSubscription.unsubscribe();
  }
}
}
