import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RideApiResponse, RideSearchResponse } from '../models/ride.model';
import { environment } from 'src/environments/environments';
import { ApiResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }

  searchRides(from:any,to:any,date:Date):Observable<RideSearchResponse>{
    const data = {
      origin:from.name,
      destination:to.name,
      date:date
    }
    return this._http.post<RideSearchResponse>(`${this.baseUrl}/ride/getSearchedRide`,data)
  }

  request(rideId:string,userId:string,requestId:string){
    const data = {
      rideId:rideId,
      userId:userId,
      requestId:requestId
    };
    return this._http.patch<RideSearchResponse>(`${this.baseUrl}/ride/requestRide`,data);
  }

  saveReview(rideId:string,userId:string,review:string){
    const data = {
      rideId:rideId,
      userId:userId,
      review:review
    };
    return this._http.post<any>(`${this.baseUrl}/review/saveComment`,data);
  }
  saveReply(reviewId:string,userId:string,reply:string){
    const data = {
      reviewId:reviewId,
      userId:userId,
      reply:reply
    };
    return this._http.patch<any>(`${this.baseUrl}/review/saveReply`,data);
  }

  requestRide(rideId:string,userId:string){
    const data = {
      rideId:rideId,
      userId:userId,
      //requestId:requestId
    };
    return this._http.patch<RideSearchResponse>(`${this.baseUrl}/ride/requestRide`,data);
  }
  
  cancelRideRequest(rideId:string,userId:string,requestId:string,action:string){
    const data = {
      rideId:rideId,
      userId:userId,
      requestId:requestId,
      action:action
    };
    console.log(data)
    return this._http.patch<RideSearchResponse>(`${this.baseUrl}/ride/cancelRideRequest`,data);
  }

  saveReviewLike(userId:string,reviewId:string):Observable<ApiResponse>{
    const data = {
      reviewId:reviewId,
      userId:userId,
    };
    return this._http.patch<ApiResponse>(`${this.baseUrl}/review/reviewLike`,data);
  }
  saveReplyLike(userId:string,replyId:string):Observable<ApiResponse>{
    const data = {
      replyId:replyId,
      userId:userId,
    };
    return this._http.patch<ApiResponse>(`${this.baseUrl}/review/replyLike`,data);
  }
  deleteReview(reviewId:string):Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(`${this.baseUrl}/review/deleteReview?id=${reviewId}`);
  }
  deleteReply(replyId:string):Observable<ApiResponse>{
    return this._http.delete<ApiResponse>(`${this.baseUrl}/review/deleteReply?id=${replyId}`);
  }
  rideLikes(id:string,userId:string):Observable<ApiResponse>{
    const data = {
      rideId:id,
      userId:userId,
    };
    return this._http.patch<ApiResponse>(`${this.baseUrl}/ride/rideLike`,data);
  }
}
