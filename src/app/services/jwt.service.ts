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
    const token =  this._cookie.get('access_token');
    return token;
  }
  getRole():string{
    return this._cookie.get('role');
  }

  discardToken():string{
      this._cookie.delete('access_token');
      return this.isTokenAvailable()?"failed":"success";
  }
  discardRole():string{
    
    this._cookie.delete('role');
    return this.isRoleAvailable()?"failed":"success";
}
  isTokenAvailable():boolean{
    let token = this._cookie.check('access_token');
    console.log("token>>",token)
    return token;
  }
  isRoleAvailable():boolean{
    let role =  this._cookie.check('role');
    console.log("role",role)
     return role;
  }
  setLocal(data:any){
    localStorage.setItem('state',JSON.stringify(data));
  }
}
