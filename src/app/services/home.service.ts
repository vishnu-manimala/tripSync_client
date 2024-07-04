import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }

  
  getData(page:number):Observable<any>{
    return this._http.get<any>(`${this.baseUrl}/admin/getHomeData?page=${page}`)
  }
}
