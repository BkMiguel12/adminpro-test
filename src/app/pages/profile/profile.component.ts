import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService, ImageService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public file: File;

  public imageTemp: any;

  constructor(private _userService: UserService) { 
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  updateUser(user: User) {

    this.user.name = user.name;
    if(!this.user.google) {
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user).subscribe();
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
