import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  if (!localStorage.getItem('token') && localStorage.getItem('role') != 'ADMIN'){
    router.navigate(['error']);
    return false;
  }
  return true;
};
