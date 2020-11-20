import { HttpHeaders } from '@angular/common/http';

export const headers = (): any => {
  const token = window.localStorage.getItem('token');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  };
  return httpOptions;
}
