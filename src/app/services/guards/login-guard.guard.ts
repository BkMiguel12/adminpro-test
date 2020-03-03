import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services.index';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}

  canActivate() {
    if(this.userService.isLogged()) {
      console.log('APROBADO');
      return true;
    } else {
      console.log('RECHAZADO');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
