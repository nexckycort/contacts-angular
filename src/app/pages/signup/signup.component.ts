import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access/access.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private isValidEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  })

  btnSignup: boolean = true;
  hide = true;

  constructor(
    private accessService: AccessService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  async signup(values:any) {
    try {
      this.btnSignup = true;
      const user = Object.assign({}, values);

      delete user.confirmPassword
      await this.accessService.signup(user);
      alert('Cuenta creada correctamente');
      this.router.navigateByUrl('/signin');
      return
    } catch (err) {
      alert(err.error.message);
      this.btnSignup = false;
    }
  }

  formValid(): void {
    if (this.signupForm.valid) {
      this.btnSignup = false;
    } else {
      this.btnSignup = true;
    }
  }

}
