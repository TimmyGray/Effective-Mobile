import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../models/user';
import { UserForm } from '../models/userForm';
import { AuthorizeService } from '../services/authorize.service';
import { confirmPasswordValidator } from '../directives/confirm_password_validator';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css'],
  providers: [FormBuilder]
})
export class AuthorizeComponent {

  authorizeForm: FormGroup;

  user: User;
  userInfo: UserForm;
  isRegistration: boolean;

  constructor(
    private readonly router: Router,
    private readonly authserv: AuthorizeService,
    private readonly fb: FormBuilder) {

    this.user = this.initUser();
    this.userInfo = this.initUserForm();
    this.isRegistration = false;

    this.authorizeForm = this.fb.group({

      login: [this.userInfo.login,
      [Validators.required, Validators.maxLength(20)]
      ],

      password: [this.userInfo.password,
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(6),
        Validators.pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*?_+-]).*$/))
        ]],

      confirm: [this.userInfo.confirm]

    }, { validators: confirmPasswordValidator });

  }

  public inputLoginPassword() {

    if (!this.isRegistration) {

      this.authorizeForm.patchValue({
        confirm: this.authorizeForm.get('password')?.value
      });

    }

  }

  public get loginField() {

    return this.authorizeForm.get('login');

  }

  public get passwordField() {

    return this.authorizeForm.get('password');

  }

  public get confirmField() {

    return this.authorizeForm.get('confirm');

  }

  public login() {

    this.user.login = this.authorizeForm.get('login')?.value;
    this.user.password = this.authorizeForm.get('password')?.value;

    let login_result = this.authserv.loginUser(this.user);

    (login_result)
      ? this.router.navigate(['/posts'])
      : alert("User not exist or invalid password"); 


  }

  public register() {

    const registrationForm = {
      login: this.authorizeForm.get('login')?.value,
      password: this.authorizeForm.get('password')?.value,
      confirm: this.authorizeForm.get('confirm')?.value
    };

    (this.authserv.registrationUser(registrationForm))
      ? this.router.navigate(['/posts'])
      : alert("The user with this login already exists");
   
  }

  private initUser(): User {

    return new User("", "");

  }

  private initUserForm() {

    return new UserForm("", "", "", true, true);

  }

}
