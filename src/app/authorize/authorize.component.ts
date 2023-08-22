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
    providers:[FormBuilder]
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
                ]
            ],
            confirm: [this.userInfo.confirm]

        }, { validators: confirmPasswordValidator });

    }

    inputLoginPassword() {

        if (!this.isRegistration) {
            this.authorizeForm.patchValue({
                confirm: this.authorizeForm.get('password')?.value
            });
        }

    }

  login() {

    this.user.login = this.authorizeForm.get('login')?.value;
    this.user.password = this.authorizeForm.get('password')?.value;
    this.authserv.loginUser(this.user);
    this.router.navigate(['/posts']);
    

  }

  register() {

    const registrationForm = {
      login: this.authorizeForm.get('login')?.value,
      password: this.authorizeForm.get('password')?.value,
      confirm: this.authorizeForm.get('confirm')?.value
    };

    this.authserv.registrationUser(registrationForm);
    this.router.navigate(['/posts']);

  }

    initUser(): User {

        return new User("", "");

    }

    initUserForm() {

      return new UserForm("qwerty", "qwerty1!", "qwerty1!", true, true);

    }

}
