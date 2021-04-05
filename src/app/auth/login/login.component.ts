import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/services.index';
import { User } from '../../models/User.model';

declare function init_scripts();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public remember:boolean = false;
  public email:string;

  public auth2:any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    init_scripts();
    this.googleInit();

    this.email = localStorage.getItem('email_record') || '';
    if(this.email.length > 1)
      this.remember = true;
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1091572805951-r853ivr9vvblg12n1o2mkb17or2g3n6u.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });

  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;
      console.log(token);

      this.userService.googleLogin(token).subscribe(() => window.location.href = '#/dashboard'); // No se visualiza correctamente con navigate
    });
  }

  signIn(form: NgForm) {
    if(form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this.userService.login(user, form.value.remember).subscribe(ok => this.router.navigate(['/dashboard']));
  }

}
