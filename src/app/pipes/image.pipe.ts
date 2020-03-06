import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'users'): any {
    let url = URL_SERVICE + '/img';

    if(!img) {
      return url + '/no-image';
    }

    if(img.indexOf('https') >= 0) {
      return img;
    }

    switch (type) {
      case 'users':
        url += '/users/' + img;
        break;

      case 'doctors':
        url += '/doctors/' + img;
        break;

      case 'hospitals':
        url += '/hospitals/' + img;
        break;
    
      default:
        console.log('Tipo invalido');
        url + '/no-image';
    }

    return url
  }

}
