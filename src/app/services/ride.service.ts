import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api.models';
import { Observable } from 'rxjs';
import { RequestModalResponse, RideApiResponse, RideRequest, RideResponse, RideSearchResponse, requestResponse, singleRIdeResponse } from '../models/ride.model';
import { FormGroup } from '@angular/forms';
import { Time } from '@angular/common';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }

  saveRideBasic(origin:any,destination:any,date:Date,time:Time,seats:number):Observable<RideResponse>{
    
    const data = {
      origin:origin,
      destination : destination,
      date:date,
      time:time,
      seats:seats
    }
    console.log("date",data)
      return this._http.post<RideResponse>(`${this.baseUrl}/ride/saveRideBasic`,{data:data})
  }
  saveVehicleId(data:string):Observable<ApiResponse>{
    console.log(data);
    return this._http.post<ApiResponse>(`${this.baseUrl}/ride/saveRideVehicle`,{data:data})
  }
  saveSettings(data:FormGroup){
    console.log(data);
    return this._http.post<ApiResponse>(`${this.baseUrl}/ride/saveRideSettings`,{data:data})
  }
  getPageRides(page:number):Observable<RideApiResponse>{
    console.log("in get data2",page)
    return this._http.get<RideApiResponse>(`${this.baseUrl}/ride/getAllPublishedRides?id=${page}`)
  }
  getAllRides():Observable<RideApiResponse>{
    console.log("in get data2")
    return this._http.get<RideApiResponse>(`${this.baseUrl}/ride/getAllPublishedRides`)
  }
  getSearchData(id:string|null):Observable<singleRIdeResponse>{
    console.log("in get data2")
    return this._http.get<singleRIdeResponse>(`${this.baseUrl}/ride/getRide?id=${id}`)
  }
  getPages(){
    return this._http.get(`${this.baseUrl}/ride/get.pages`)
  }
  getRequestedData(data:RideRequest[]):Observable<RequestModalResponse>{
    return this._http.post<RequestModalResponse>(`${this.baseUrl}/ride/get.rideRequestedUser`,{data:data})
  }
  acceptRequest(id:String):Observable<requestResponse>{
    return this._http.patch<requestResponse>(`${this.baseUrl}/ride/acceptRequest`,{id:id})
  }
  cancelRequest(id:String):Observable<requestResponse>{
    return this._http.patch<requestResponse>(`${this.baseUrl}/ride/cancelRequest`,{id:id})
  }
  rejectRequest(id:String):Observable<requestResponse>{
    return this._http.patch<requestResponse>(`${this.baseUrl}/ride/rejectRequest`,{id:id})
  }
  deleteUnfinishedRide():Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(`${this.baseUrl}/ride/deleteUnfinishedRide`)
  }
  deleteRide(id:string):Observable<ApiResponse>{
    return this._http.patch<ApiResponse>(`${this.baseUrl}/ride/deleteRide?id=${id}`,id)
  }
  //ride page
  getRideData(page:number):Observable<RideSearchResponse>{
    return this._http.get<RideSearchResponse>(`${this.baseUrl}/ride/getRideData?page=${page}`)
  }
}
