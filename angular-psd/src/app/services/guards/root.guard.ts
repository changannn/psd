import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const rootGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  if (!localStorage.getItem('token') && (localStorage.getItem('role') != 'ROOT')){
    router.navigate(['error']);
    return false;
  }
  return true;
};
