import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _jwt:JwtService, private _router:Router) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._jwt.getToken();
    console.log("inter",token);
    if(token){
      request = request.clone({
        setHeaders: {
          Authorization: `${token} `
        }
      });
      console.log("head",request.headers)
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['auth']);
          }
        }
        return throwError(()=>new Error("Something went wrong"))
      })
    )
  }
}
