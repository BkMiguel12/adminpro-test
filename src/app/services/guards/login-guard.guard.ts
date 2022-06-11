import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.validateToken().pipe(
      tap(isAuth => {
        if(!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  
}