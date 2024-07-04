import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileResponse } from '../models/profile.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.models';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }
  getProfile(id:any){
    return this._http.get<ProfileResponse>(`${this.baseUrl}/profile/getProfileData?id=${id}`);
  }

  getProfileData():Observable<ProfileResponse>{
    return this._http.get<ProfileResponse>(`${this.baseUrl}/profile/getProfileData`);
  }

  followProfile(id:string):Observable<ApiResponse>{
    return this._http.patch<ApiResponse>(`${this.baseUrl}/profile/followProfile`,{id:id});
  }
  unfollowProfile(id:string):Observable<ApiResponse>{
    return this._http.patch<ApiResponse>(`${this.baseUrl}/profile/unfollowProfile`,{id:id});
  }
}
