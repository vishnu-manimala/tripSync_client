import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Vehicle, Vehicleresponse } from '../models/vehicle_response.model';
import { Observable, flatMap, from, map } from 'rxjs';
import { ApiResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http:HttpClient) { }
  getCarBrands(type: string){
    return this._http.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type}?format=json`)
  }

  saveVehicleData(data:FormGroup):Observable<Vehicleresponse>{
    return this._http.post<Vehicleresponse>('http://localhost:3001/vehicle/save.vehicle',data);
  }

  saveRegistrationData(data:FormGroup):Observable<Vehicleresponse>{
    return this._http.post<Vehicleresponse>('http://localhost:3001/vehicle/save.registration.data',data);
  }

  saveInsuranceData(data:FormGroup):Observable<Vehicleresponse>{
    return this._http.post<Vehicleresponse>('http://localhost:3001/vehicle/save.insurance.data',data);
  }

  saveVehiclePhoto(files:FormData){
    return this._http.post('http://localhost:3001/vehicle/save.vehicle.photos',files);
  }

  
  //to get all vehicles data added in profile
  getVehiclesData(): Observable<Vehicle[]>{
    return this._http.get<Vehicle[]>('http://localhost:3001/vehicle/get.vehicles.info')
  }
  deleteVehicle(id:string):Observable<ApiResponse>{
    return this._http.get<ApiResponse>(`http://localhost:3001/vehicle/delete?id=${id}`)
  }
  getVehicleData(id:string|null): Observable<Vehicleresponse>{
    return this._http.get<Vehicleresponse>(`http://localhost:3001/vehicle/get.vehicle.info?id=${id}`);
  }
  
}
