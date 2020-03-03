import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { 
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuard
 } from './services.index';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServicesModule { }
