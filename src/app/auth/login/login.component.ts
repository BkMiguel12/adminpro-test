import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/services.index";
import Swal from "sweetalert2";

declare function init_scripts();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]], // Obtiene el email guardado del Recuerdame en el Localstorage sino un string vacio
    password: ['', Validators.required],
    remember: [false],
  });

  public remember: boolean = false;
  public email: string;

  public auth2: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    init_scripts();
    this.googleInit();

    this.email = localStorage.getItem("email_record") || "";
    if (this.email.length > 1) this.remember = true;
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "1091572805951-r853ivr9vvblg12n1o2mkb17or2g3n6u.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email",
      });
      this.attachSignIn(document.getElementById("btnGoogle"));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;
      console.log(token);

      this.userService
        .googleLogin(token)
        .subscribe(() => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          })
        });
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe(
      (ok) => {
        console.log(ok);
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigate(["/dashboard"]);
      },
      (err) => {
        console.log(err);
        Swal.fire("Error!", err.error.msg, "error");
      }
    );
  }
}
