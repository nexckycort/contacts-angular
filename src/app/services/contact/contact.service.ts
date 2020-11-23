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

  findAll() {
    return this.http.get(api.contacts.findAll, headers())
  }

  findOne(id: string): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.get(api.contacts.findOne(id), headers())
        .subscribe(result => {
          resolve(result)
        },
          err => invalidToken(err, this.router)
        )
    })
  }

  create(contact: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.post(api.contacts.create, contact, headers())
        .subscribe(result => {
          resolve(result)
        },
          err => invalidToken(err, this.router)
        )
    })
  }

  update(id: string, contact: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.put(api.contacts.update(id), contact, headers())
        .subscribe(result => {
          resolve(result)
        },
          err => invalidToken(err, this.router)
        )
    })
  }

  delete(id: string) {
    return this.http.delete(api.contacts.delete(id), headers())
  }
}
