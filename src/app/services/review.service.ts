import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ReviewResponse } from '../models/review.model';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }
  getReviews(page:number):Observable<ReviewResponse>{
    return this._http.get<ReviewResponse>(`${this.baseUrl}/admin/getReviews?id=${page}`);
  }
}
