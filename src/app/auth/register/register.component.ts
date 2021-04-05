import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import Swal from 'sweetalert2';
import { UserService } from '../../services/services.index';

declare function init_scripts();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    init_scripts();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password_2: new FormControl(null, Validators.required),
      conditions: new FormControl(false),
    }, {validators: this.checkPasswords('password', 'password_2')});

    this.form.setValue({
      name: 'Test',
      email: 'test@test.com',
      password: '123123123',
      password_2: '123123123',
      conditions: true
    });
  }

  submitForm() {
    if(this.form.invalid) {
      return;
    }

    if(!this.form.value.conditions) {
      Swal.fire('Importante', 'Debe aceptar los Términos y Condiciones', 'warning');
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.createUser(user).subscribe(res => {
      console.log(res);
      this.route.navigate(['/login']);
    })
  }

  checkPasswords(field1: string, field2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if(pass1 === pass2) {
        return null;
      }

      return {
        checkPasswords: true
      }
    }
  }

}
