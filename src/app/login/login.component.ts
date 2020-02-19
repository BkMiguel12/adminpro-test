import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/services.index';
import { User } from '../models/User.model';

declare function init_scripts();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public remember:boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    init_scripts();
  }

  signIn(form: NgForm) {
    if(form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this.userService.login(user, form.value.remember).subscribe(ok => this.router.navigate(['/dashboard']));
  }

}
