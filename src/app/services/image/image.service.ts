import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

@Injectable()
export class ImageService {
  public url = `${environment.baseUrl}/upload/`;

  get getToken(): string {
    return localStorage.getItem('tokenPro') || '';
  }

  constructor(private http: HttpClient) {}

  public uploadImage(file: any, type: string, id: string) {
    const url = this.url + `${type}/${id}`;
    
    return this.http.put(url, file, {
      headers: {
        'x-token': this.getToken
      }
    }).toPromise();
  }
}
