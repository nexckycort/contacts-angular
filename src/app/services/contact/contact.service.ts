import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { headers } from 'src/app/helpers/headers';
import { invalidToken } from 'src/app/helpers/invalid.token';
import { api } from 'src/environments/api.url';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  findAll(): Promise<any> {
    return new Promise((resolve, _rejects) => {
      this.http.get(api.contacts.findAll, headers())
        .subscribe(result => {
          resolve(result)
        },
          err => invalidToken(err, this.router)
        )
    })
  }
}
