import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { URL_SERVICE } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string = URL_SERVICE + '/users';

  public user: User;
  public token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.loadLocal();
   }

  isLogged() {
    return (this.token) ? true : false;
  } 

  loadLocal() {
    if(localStorage.getItem('tokenPro')) {
      this.token = localStorage.getItem('tokenPro');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = null;
      this.user = null;
    }
  }

  login(user: User, remember: boolean = false) {
    let url = URL_SERVICE + '/login';

    if(remember) {
      localStorage.setItem('email_record', user.email);
    } else {
      localStorage.removeItem('email_record');
    }

    return this.http.post(url, user)
      .pipe(
        map((res:any) => {
          this.saveLocal(res.id, res.token, res.user);
          return true;
        })
      );
  }

  googleLogin(token: string) {
    let url = URL_SERVICE + '/login/google';

    return this.http.post(url, {token: token})
      .pipe(
        map((res: any) => {
          this.saveLocal(res.id, res.token, res.user);
          return true;
        })
      );
  }

  logout() {
    this.token = null;
    this.user = null;

    localStorage.removeItem('tokenPro');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  createUser(user: User) {
    console.log(user);
    return this.http.post(this.url, user)
      .pipe(
        map( (res: any) => {
          Swal.fire('Usuario creado!', user.email, 'success');
          return res.user;
        })
      )
  }

  saveLocal(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('tokenPro', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }
}
