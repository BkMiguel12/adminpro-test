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
    });

  }

  uploadFile() {
    this._userService.uploadImage(this.file, this.user._id);
  }

  onFileChange(file: File) {

    if(!file) {
      this.file = null;
      return;
    }
    
    if(file.type.indexOf('image') < 0) {
      this.file = null;
      Swal.fire('Formato no permitido', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    let fileReader = new FileReader();
    let urlTemp = fileReader.readAsDataURL(file);

    fileReader.onloadend = () => this.imageTemp = fileReader.result;

    this.file = file;
  }

}
