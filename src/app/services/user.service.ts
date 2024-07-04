import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersResponse, UsersResponseData } from '../models/users_response.model';
import { ApiResponse } from '../models/api.models';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }

  getAllUsers(page:number):Observable<UsersResponseData>{
    return this._http.get<UsersResponseData>(`${this.baseUrl}/admin/users?id=${page}`)
  }
  blockUser(id:string):Observable<ApiResponse>{
    console.log("in block")
    return this._http.patch<ApiResponse>(`${this.baseUrl}/admin/block`,{id:id})
  }
  verifyUser(id:string):Observable<ApiResponse>{
    return this._http.patch<ApiResponse>(`${this.baseUrl}/admin/verify`,{id:id})
  }
  unBlockUser(id:string):Observable<ApiResponse>{
    return this._http.patch<ApiResponse>(`${this.baseUrl}1/admin/unBlock`,{id:id})
  }
}
