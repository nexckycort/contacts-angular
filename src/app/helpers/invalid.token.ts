import { Router } from '@angular/router'
import { ResponseStatus } from './api.response'

export const invalidToken = (err: any, router: Router) => {
  if (err.status === ResponseStatus.UNAUTHORIZED) {
    window.localStorage.removeItem('token');
    alert('token no valido')
    router.navigateByUrl('/signin')
  }
}
