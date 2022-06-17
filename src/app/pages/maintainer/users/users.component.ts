import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: User[] = [];
  public from: number = 0;
  public loading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({total, users}) => {
      this.totalUsers = total;
      this.users = users;
      this.loading = false;
    });
  }

  changePage(value: number = 0) {
    this.from += value;

    if(this.from < 0) {
      this.from = 0;
      return;
    } else if(this.from >= this.totalUsers) {
      this.from -= 5;
    }

    this.getUsers();
  }

}
