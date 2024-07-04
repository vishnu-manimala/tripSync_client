import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { RzpResponse, reqIDsData } from '../models/payment.model';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {

  }
  payFare(amount: number, rideID: string): Observable<RzpResponse> {
    console.log("in amount", amount)
    return this._http.post<RzpResponse>(`${this.baseUrl}/ride/createOrder`, { amount: amount, rideID: rideID })
  }

  savePayment(data: any, ride: reqIDsData, amount: number): Observable<ApiResponse> {
    return this._http.patch<ApiResponse>(`${this.baseUrl}/ride/savePayment`, { data: data, ride: ride, amount: amount })
  }
  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this._window();
    }
  }
  _window(): any {
    // return the global native browser window object
    return window;
  }
}
