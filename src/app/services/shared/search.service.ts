import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  get getToken(): string {
    return localStorage.getItem('tokenPro') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.getToken
      }
    }
  }

  private transformUser (users: any[]): User[] {
    return users.map(user => new User(user.name, user.email, '', user.image, user.role, user.google, user._id));
  }

  search(type: 'users' | 'doctors' | 'hospitals', text: string) {
    const url = `${base_url}/search/collection/${type}/${text}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUser(resp.results);
          
          default:
            return [];
        }
      })
    );
  }
}
