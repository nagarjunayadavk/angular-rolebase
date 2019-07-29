import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
     let userData = this.authService.getLoginDetails();
    const currentUser = userData ? JSON.parse(userData)['role'] : null;
    if (currentUser) {
      // check if route is restricted by roles 'Admin' or 'normal user'
      if (route.data.roles && route.data.roles.indexOf(currentUser) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/accessdenied']);
        return false;
      }
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;

  }

}
