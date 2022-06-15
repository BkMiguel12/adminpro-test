import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/services.index';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(private _userService: UserService) { 
    this.user = _userService.user;
  }

  ngOnInit() {}

  logout() {
    this._userService.logout();
  }

}
