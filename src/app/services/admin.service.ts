import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RideApiResponse } from '../models/ride.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.models';
import { AdminDataResponse } from '../models/admin.model';
import { Vehicleresponse } from '../models/vehicle_response.model';
import { UserResponseData } from '../models/users_response.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  getAdminData(): Observable<AdminDataResponse> {
    return this._http.get<AdminDataResponse>(`${this.baseUrl}/admin/getAdminData`)
  }
  getRideList(page: number): Observable<RideApiResponse> {
    return this._http.get<RideApiResponse>(`${this.baseUrl}/admin/getRideList?id=${page}`)
  }
  getVehicleList(page: number): Observable<Vehicleresponse> {
    return this._http.get<Vehicleresponse>(`${this.baseUrl}/admin/getFullVehicleList?id=${page}`)
  }
  block(id: string): Observable<ApiResponse> {
    return this._http.patch<ApiResponse>(`${this.baseUrl}/admin/blockRide`, { id: id })
  }
  unblock(id: string): Observable<ApiResponse> {
    return this._http.patch<ApiResponse>(`${this.baseUrl}/admin/unBlockRide`, { id: id })
  }

  getPages(page: string) {
    return this._http.get(`${this.baseUrl}/admin/getPages?page=${page}`)
  }

  blockVehicle(id: string): Observable<ApiResponse> {
    return this._http.patch<ApiResponse>(`${this.baseUrl}/admin/block.vehicles`, { id: id })
  }
  unblockVehicle(id: string): Observable<ApiResponse> {
    return this._http.patch<ApiResponse>(`${this.baseUrl}/admin/unblock.vehicles`, { id: id })
  }
  verifyVehicle(id: string): Observable<ApiResponse> {
    return this._http.patch<ApiResponse>(`${this.baseUrl}/admin/verify.vehicles`, { id: id })
  }

  verifyUser(id: string, path: string): Observable<UserResponseData> {
    return this._http.patch<UserResponseData>(`${this.baseUrl}/admin/verifyUser`, { id: id, path: path })
  }
}
