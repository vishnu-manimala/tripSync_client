import { Injectable } from '@angular/core';
import { ApiResponse, sendOtpResponse } from '../models/api.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';
import { UserResponseData, UsersResponseData } from '../models/users_response.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }
  getUserData():Observable<UserResponseData>{
    return this._http.get<UserResponseData>(`${this.baseUrl}/accounts/getUserData`)
  }
  updateName(name:string):Observable<sendOtpResponse>{
    return this._http.patch<sendOtpResponse>(`${this.baseUrl}/accounts/updateName`,{name:name})
  }
  saveProfilePhoto(file: File):Observable<ApiResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this._http.post<ApiResponse>(`${this.baseUrl}/accounts/saveProfilephoto`,formData);
  }
  saveIdPhotos(formdata:FormData){
    console.log(formdata)
    return this._http.post(`${this.baseUrl}/accounts/saveIdPhotos`,formdata);
  }

  saveLicensePhotos(formdata:FormData){
    return this._http.post(`${this.baseUrl}/accounts/saveLicensePhotos`,formdata);
  }
}
