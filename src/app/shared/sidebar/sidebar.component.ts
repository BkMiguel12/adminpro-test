import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/services.index';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public user: User;
  public menuItems: any[];

  constructor(private _sidebar: SidebarService, private _userService: UserService) { }

  ngOnInit() {
    this.menuItems = this._sidebar.menu;
    this.user = this._userService.user;
  }

  logout() {
    this._userService.logout();
  }

}
