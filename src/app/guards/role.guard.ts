import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const roleGuard: CanActivateFn = (route, state) => {
 const jwtService = inject(JwtService);
 const router = inject(Router);
  const role = jwtService.getRole();
  console.log(route.data['role'],role)
  if(role !== route.data['role']){
    router.navigate(['auth']);
    return false;
  }
  return true;
};
