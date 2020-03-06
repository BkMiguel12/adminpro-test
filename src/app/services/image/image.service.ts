import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import Swal from 'sweetalert2';

@Injectable()
export class ImageService {

  public url = URL_SERVICE + '/upload/';

  constructor(private http: HttpClient) { }

  public uploadImage(file:any, type:string, id: string) {
    let url = this.url + `${type}/${id}`;

    return this.http.put(url, file).toPromise();
  }
}
