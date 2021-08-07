import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../../models/User.model";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";
import { ImageService } from "../image/image.service";
import { RegisterForm } from "../../models/RegisterForm.interface";
import { environment } from "../../../environments/environment";

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
    private _imageService: ImageService
  ) {
    this.loadLocal();
  }

  isLogged() {
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

  login(user: User, remember: boolean = false) {
    let url = base_url + "/login";

    if (remember) {
      localStorage.setItem("email_record", user.email);
    } else {
      localStorage.removeItem("email_record");
    }

    return this.http.post(url, user).pipe(
      map((res: any) => {
        this.saveLocal(res.id, res.token, res.user);
        return true;
      })
    );
  }

  googleLogin(token: string) {
    let url = base_url + "/login/google";

    return this.http.post(url, { token: token }).pipe(
      map((res: any) => {
        this.saveLocal(res.id, res.token, res.user);
        return true;
      })
    );
  }

  logout() {
    this.token = null;
    this.user = null;

    localStorage.removeItem("tokenPro");
    localStorage.removeItem("user");

    this.router.navigate(["/login"]);
  }

  createUser(formData: RegisterForm) {
    console.log(formData);
    return this.http.post(`${base_url}/users`, formData);
  }

  updateUser(user: User) {
    let url = base_url + `/${this.user._id}?token=${this.token}`;

    console.log(url);

    return this.http.put(url, user).pipe(
      map((res: any) => {
        console.log(res);
        let user = res.user;
        this.saveLocal(user._id, this.token, user);

        Swal.fire("Usuario actualizado!", user.name, "success");

        return true;
      })
    );
  }

  uploadImage(file: File, id: string) {
    console.log(file);
    let formData = new FormData();
    formData.append("image", file, file.name);

    this._imageService
      .uploadImage(formData, "users", id)
      .then((res: any) => {
        this.user.image = res.user.image;
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
}
