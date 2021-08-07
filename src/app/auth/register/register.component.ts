import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserService } from "../../services/services.index";

declare function init_scripts();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["../login/login.component.scss"],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public formSubmitted: boolean = false;
  public registerForm = this.fb.group(
    {
      name: ["Test 3", Validators.required],
      email: ["test3@gmail.com", [Validators.required, Validators.email]],
      password: ["miguel12", Validators.required],
      password2: ["miguel12", Validators.required],
      terms: [true, Validators.required],
    },
    {
      validators: this.validateEqualPass("password", "password2"),
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    init_scripts();
  }

  submitForm() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          "Usuario creado!",
          this.registerForm.get("email").value,
          "success"
        );
        this.route.navigate(["/login"]);
      },
      (err) => {
        console.log(err);
        Swal.fire("Error!", err.error.msg, "error");
      }
    );
  }

  validateField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  validateTerms(): boolean {
    return !this.registerForm.get("terms").value && this.formSubmitted;
  }

  validateEqualPass(pass1Field: string, pass2Field: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get(pass1Field);
      const pass2 = formGroup.get(pass2Field);

      if (pass1.value === pass2.value) {
        pass2.setErrors(null);
      } else {
        pass2.setErrors({ notEqual: true });
      }
    };
  }
}
