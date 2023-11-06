import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http:HttpClient) { }
  getCarBrands(type: string){
    return this._http.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type}?format=json`)
  }

  saveVehicleData(data:FormGroup){
    return this._http.post('http://localhost:3001/vehicle/save.vehicle',data);
  }

  saveRegistrationData(data:FormGroup){
    return this._http.post('http://localhost:3001/vehicle/save.registration.data',data);
  }

  saveInsuranceData(data:FormGroup){
    return this._http.post('http://localhost:3001/vehicle/save.insurance.data',data);
  }

  saveVehiclePhoto(files: FormData){
    return this._http.post('http://localhost:3001/vehicle/save.vehicle.photos',files);
  }

  //to get all vehicles data added in profile
  getVehiclesData(){
    return this._http.get('http://localhost:3001/vehicle/get.vehicles.info');
  }

}
