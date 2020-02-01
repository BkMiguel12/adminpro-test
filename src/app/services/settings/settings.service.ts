import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {

  public defSettings:Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
   }

  saveSettings() {
    console.log('Guardando en local');
    localStorage.setItem('settings', JSON.stringify(this.defSettings));
  }

  loadSettings() {
    if(localStorage.getItem('settings')) {
      console.log('Cargado desde local');
      this.defSettings = JSON.parse(localStorage.getItem('settings'));
      this.changeTheme(this.defSettings.theme);
    }else {
      console.log('Cargando desde local default');      
      this.changeTheme(this.defSettings.theme);
    }
  }

  changeTheme(color: string) {
    let url = `assets/css/colors/${color}.css`;
    this._document.getElementById('principal-theme').setAttribute('href', url);

    this.defSettings.theme = color;
    this.defSettings.themeUrl = url;

    this.saveSettings();
  }
}

interface Settings {
  themeUrl: string,
  theme: string
}
