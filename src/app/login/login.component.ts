import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_scripts();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    init_scripts();
  }

  enterDash() {
    console.log('Entrando...');
    this.router.navigate(['/dashboard']);
  }

}
