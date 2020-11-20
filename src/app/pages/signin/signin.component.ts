import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access/access.service';
import { Signin } from 'src/app/types/access';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user!: Signin;

  private isValidEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  btnSignin: boolean = true;
  hide = true;


  constructor(
    private accessService: AccessService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  async signin(values: any) {
    try {
      this.btnSignin = true;
      const result = await this.accessService.signin(values);
      this.user = result.data;
      window.localStorage.setItem('token', this.user.tokens)
      alert(`Hi ${this.user.user.name} ${result.message}`)
      this.router.navigateByUrl('/')
      return
    } catch (err) {
      alert(err.error.message);
      this.btnSignin = false;
    }
  }

  formValid(): void {
    if (this.signinForm.valid) {
      this.btnSignin = false;
    } else {
      this.btnSignin = true;
    }
  }

}
