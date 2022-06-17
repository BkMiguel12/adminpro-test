import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../../models/User.model";
import Swal from "sweetalert2";
import { catchError, map } from "rxjs/operators";
import { ImageService } from "../image/image.service";
import { RegisterForm } from "../../models/RegisterForm.interface";
import { environment } from "../../../environments/environment";
import { LoginForm } from "../../models/LoginForm.interface";
import { tap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { GetUser } from "src/app/models/GetUser.interface";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class UserService {
  public user: User;
  public token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _imageService: ImageService,
    private ngZone: NgZone
  ) {
    this.loadLocal();
  }

  get getToken(): string {
    return localStorage.getItem('tokenPro') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.getToken
      }
    }
  }

  isLogged() {
    console.log(this.token);
    return this.token ? true : false;
  }

  loadLocal() {
    if (localStorage.getItem("tokenPro")) {
      this.token = localStorage.getItem("tokenPro");
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = null;
      this.user = null;
    }
  }

  googleLogin(token: string) {
    let url = base_url + "/login/google";
    return this.http.post(url, { token: token }).pipe(
      map((res: any) => {
        console.log(res);
        this.saveLocal(res.user.uid, res.token, res.user);
        return true;
      })
    );
  }

  logout() {
    this.token = null;
    this.user = null;

    localStorage.removeItem("tokenPro");
    localStorage.removeItem("user");

    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    })
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew-token`, this.headers).pipe(
      map((resp:any) => {
        const { name, email, google, image, role, uid } = resp.user;
        this.user = new User(name, email, '', image, role, google, uid);
        localStorage.setItem("tokenPro", this.getToken);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap( (resp: any) => {
        console.log(resp);
        this.saveLocal(resp.user.uid, resp.token, resp.user)
      })
    );
  }

  updateUser(user: User) {
    let url = base_url + `/users/${this.user._id}`;
    // let url = base_url + `/${this.user._id}?token=${this.getToken}`;

    return this.http.put(url, user, this.headers);
    // .pipe(
    //   map((res: any) => {
    //     let user = res.user;
    //     this.saveLocal(user._id, this.token, user);

    //     Swal.fire("Usuario actualizado!", user.name, "success");

    //     return true;
    //   })
    // );
  }

  uploadImage(file: File, id: string) {
    let formData = new FormData();
    formData.append("img", file);

    console.log(formData);

    this._imageService
      .uploadImage(formData, "users", id)
      .then((res: any) => {
        this.user.image = res.fileName;
        Swal.fire("Imagen Actualizada!", this.user.name, "success");

        this.saveLocal(id, this.token, this.user);
      })
      .catch((err) => console.log("Error", err));
  }

  saveLocal(id: string, token: string, user: User) {
    localStorage.setItem("id", id);
    localStorage.setItem("tokenPro", token);
    localStorage.setItem("user", JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  getUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<GetUser>(url, this.headers)
      .pipe(
        map(resp => {
          const users = resp.users.map(user => new User(user.name, user.email, '', user.image, user.role, user.google, user._id));
          return {
            total: resp.total,
            users
          };
        })
      );
  }
}
