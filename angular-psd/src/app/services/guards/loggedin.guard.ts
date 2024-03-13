import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const loggedinGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  if (localStorage.getItem('isLoggedIn') == 'true'){
    if(localStorage.getItem('role') == 'ROOT')
    {
      router.navigate(['homepage-admin']);
    }
    else
    {
      router.navigate(['homepage-user'])
    }
    return false;
  }
  return true;
};
