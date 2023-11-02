import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserRole } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private _cookie:CookieService) { }
  setToken(token:string):string{
    this._cookie.set('access_token',token);
    return "success";
  }
  setRole(role:UserRole):string{
    this._cookie.set('role',role);
    return "success";
  }
  getToken():string{
    const myToken =  this._cookie.get('access_token');
    return myToken;
  }
  getRole():string{
    return this._cookie.get('role');
  }

  discardToken():string{
      this._cookie.delete('access_token');
      this._cookie.delete('role');
      return this.isTokenAvailable()?"success":"failed";
  }

  isTokenAvailable():boolean{
    return this._cookie.check('access_token');
  }

  setLocal(data:any){
    localStorage.setItem('state',JSON.stringify(data));
  }
}
