import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/api.url';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  constructor(private http: HttpClient) { }

  signup(user: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.post(api.signup, user)
        .subscribe(result => {
          resolve(result)
        },
          err => rejects(err)
        )
    })
  }

  signin(user: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.post(api.signin, user)
        .subscribe(result => {
          resolve(result)
        },
          err => rejects(err)
        )
    })
  }
}
