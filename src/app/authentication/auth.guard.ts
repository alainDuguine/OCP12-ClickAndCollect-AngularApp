import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.currentUser.pipe(
    //   take(1),
    //   map(user => {
    //     const isAuth = !!user;
    //     if (isAuth) {
    //       return true;
    //     } else {
    //       return this.router.createUrlTree(['/auth/login']);
    //     }
    //   })
    // );
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/auth/login'], {queryParams: { returnUrl: state.url }});
    return false;
  }

}
