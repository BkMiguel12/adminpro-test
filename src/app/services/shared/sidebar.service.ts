import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  public menu:any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {title: 'Dashboard', url: ''},
        {title: 'Progreso', url: 'progress'},
        {title: 'Gráficas', url: 'graphics1'},
        {title: 'Promesas', url: 'promises'},
        {title: 'RxJs', url: 'rxjs'}
      ]
    }
  ]

  constructor() { }
}
