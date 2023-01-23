import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/services.index';
import { SearchService } from 'src/app/services/shared/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: User[] = [];
  public tempUsers: User[] = [];
  public from: number = 0;
  public loading: boolean = false;

  constructor(private userService: UserService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({total, users}) => {
      this.totalUsers = total;
      this.users = users;
      this.tempUsers = users;
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

  searchUsers(text: string) {
    if( text.length === 0 ) {
      return this.users = this.tempUsers;
    }
    
    this.searchService.search('users', text).subscribe(res => {
      console.log(res);
      this.users = res;
    })
  }

}
