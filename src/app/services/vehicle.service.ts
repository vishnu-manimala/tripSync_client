import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SingleVehicleResponse, Vehicle, Vehicleresponse } from '../models/vehicle_response.model';
import { Observable, flatMap, from, map } from 'rxjs';
import { ApiResponse } from '../models/api.models';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }
  getCarBrands(type: string){
    return this._http.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type}?format=json`)
  }

  saveVehicleData(data:FormGroup):Observable<Vehicleresponse>{
    return this._http.post<Vehicleresponse>(`${this.baseUrl}/vehicle/save.vehicle`,data);
  }

  saveRegistrationData(data:FormGroup):Observable<Vehicleresponse>{
    return this._http.post<Vehicleresponse>(`${this.baseUrl}/vehicle/save.registration.data`,data);
  }

  saveInsuranceData(data:FormGroup):Observable<Vehicleresponse>{
    return this._http.post<Vehicleresponse>(`${this.baseUrl}/vehicle/save.insurance.data`,data);
  }

  saveVehiclePhoto(files:FormData){
    return this._http.post(`${this.baseUrl}/vehicle/save.vehicle.photos`,files);
  }

  getVehiclelist(): Observable<Vehicleresponse>{
    return this._http.get<Vehicleresponse>(`${this.baseUrl}/vehicle/getVehicles`)
  }
  //to get all vehicles data added in profile
  getVehiclesData(): Observable<Vehicleresponse>{
    return this._http.get<Vehicleresponse>(`${this.baseUrl}/admin/getFullVehicleList`)
  }
  deleteVehicle(id:string):Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(`${this.baseUrl}/vehicle/delete?id=${id}`)
  }
  getVehicleData(id:string|null): Observable<SingleVehicleResponse>{
    return this._http.get<SingleVehicleResponse>(`${this.baseUrl}/vehicle/get.vehicle.info?id=${id}`);
  }
  updateVehicle(data:FormData,id:string|null){
    console.log(data,id);
    return this._http.patch<ApiResponse>(`${this.baseUrl}/vehicle/update.vehicle?id=${id}`,data);
  }
  updateRegistrationData(data:FormData,id:string|null){
    console.log(data,id);
    return this._http.patch<ApiResponse>(`${this.baseUrl}/vehicle/update.registration?id=${id}`,data);
  }
  updateInsuranceData(data:FormData,id:string|null){
    console.log(data,id);
    return this._http.patch<ApiResponse>(`${this.baseUrl}/vehicle/update.insurance?id=${id}`,data);
  }

  updateVehiclePhoto(data:FormData,id:string|null){
    console.log(data,id);
    return this._http.patch<SingleVehicleResponse>(`${this.baseUrl}/vehicle/update.image?id=${id}`,data);
  }
  deleteImage(id:string,data:string){
    console.log(id,data)
    return this._http.post<SingleVehicleResponse>(`${this.baseUrl}/vehicle/delete.image?id=${id}`,{image:data});
  }
  getVehicledata(page:number){
    return this._http.get<Vehicleresponse>(`${this.baseUrl}/vehicle/get.vehicles.info?id=${page}`);
  }

  getPages(){
    return this._http.get(`${this.baseUrl}/vehicle/get.pages`);
  }
  cancelPublishing():Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(`${this.baseUrl}/vehicle/cancelPublishing`);
  }
  
}
