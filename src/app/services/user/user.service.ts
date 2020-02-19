import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User.model';
import { URL_SERVICE } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string = URL_SERVICE + '/users';

  constructor(private http: HttpClient) {
    console.log('Servicio activo');
   }

  login(user: User, remember: boolean = false) {
    let url = URL_SERVICE + '/login';

    return this.http.post(url, user)
      .pipe(
        map((res:any) => {
          localStorage.setItem('id', res.id);
          localStorage.setItem('tokenPro', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          return true;
        })
      );
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
}
