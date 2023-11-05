import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const isLoggedIn = jwtService.isTokenAvailable();
  if(!isLoggedIn){
    console.log(route.url);
    router.navigate(['auth']);
    return false;
  }
    return true;
};
