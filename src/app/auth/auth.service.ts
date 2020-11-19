import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  token: string | null = null;

  constructor(
    private router: Router
  ) { }

  canActivate() {
    this.token = window.localStorage.getItem('token')
    if (!this.token) {
      this.router.navigateByUrl('signin')
      return false
    }
    return true
  }
}
