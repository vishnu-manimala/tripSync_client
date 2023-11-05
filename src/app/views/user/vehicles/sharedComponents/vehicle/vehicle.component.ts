import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {
  @Input() vehicleInput!:FormGroup;
  vehicleData:FormGroup;
  brands:any;
  returnData:any;
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
    this._vehicleService.saveVehicleData(this.vehicleData.value).subscribe((result:any) => {
      this.returnData = result;
      console.log(this.returnData);
      if (this.returnData.status === "Success") {
        this._jwt.setToken(this.returnData.token);console.log("in succes")
        this._router.navigate(['add.vehicle.registartion'])
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
}
