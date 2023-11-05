import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router =inject(Router);
  const role:string = jwtService.getRole();
  const isLoggedIn = jwtService.isTokenAvailable();
  if(isLoggedIn){
    router.navigate([role]);
    return false;
  }
  return true;
};
