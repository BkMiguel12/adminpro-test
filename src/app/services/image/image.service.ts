import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

import { environment } from "../../../environments/environment";

@Injectable()
export class ImageService {
  public url = `${environment.baseUrl}/upload/`;

  constructor(private http: HttpClient) {}

  public uploadImage(file: any, type: string, id: string) {
    let url = this.url + `${type}/${id}`;

    return this.http.put(url, file).toPromise();
  }
}
