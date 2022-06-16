import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService, ImageService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public profileForm: FormGroup;
  public file: File;

  public imageTemp: any;

  constructor(private _userService: UserService, private fb: FormBuilder) { 
    this.user = this._userService.user;
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateUser() {

    this._userService.updateUser(this.profileForm.value).subscribe(() => {
      const { name, email } = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;

      Swal.fire("Usuario actualizado!", this.user.name, "success");
    }, (err) => {
      Swal.fire("Error", err.error.msg, "error");
    });

  }

  uploadFile() {
    this._userService.uploadImage(this.file, this.user._id);
  }

  onFileChange(file: File) {

    if(!file) {
      this.imageTemp = null;
      return;
    }

    this.file = file;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => this.imageTemp = fileReader.result;

  }

}
