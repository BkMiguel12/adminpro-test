import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _sidebar: SidebarService, private _userService: UserService) { }

  ngOnInit() {
  }

}
