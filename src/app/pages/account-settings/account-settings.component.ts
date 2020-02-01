import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingService: SettingsService) { }

  ngOnInit() {
    this.verifyCheck();
  }

  changeTheme(color: string, link: any) {
    
    this.applyCheck(link);
    this.settingService.changeTheme(color);
  }

  applyCheck(link: any) {
    let selectors:any = document.getElementsByClassName('selector');

    for(let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  verifyCheck() {
    let selectors:any = document.getElementsByClassName('selector');
    let theme = this.settingService.defSettings.theme;

    for(let ref of selectors) {
      if(ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
