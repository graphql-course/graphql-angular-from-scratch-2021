import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): boolean  {

    if (localStorage.getItem('tokenJWT') !== null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
