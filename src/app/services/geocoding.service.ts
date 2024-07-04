import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private hereAppId = 'OGLtjTEF4m4uTChM3S0CAA';
  private hereAppCode = 'tfZ6TuhuQQxau74x6ngMK5SNrD92rg6hIX13btharr4';

  constructor(private _http: HttpClient) {}

  searchLocation(query: string): Observable<any> {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=240+Washington+St.%2C+Boston&limit=4&apiKey={tfZ6TuhuQQxau74x6ngMK5SNrD92rg6hIX13btharr4}`;
    return this._http.get(url);
  }
}
