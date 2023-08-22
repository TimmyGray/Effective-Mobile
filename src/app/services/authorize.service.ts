import { Injectable,EventEmitter } from '@angular/core';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  isAuthorized = new EventEmitter<boolean>();

  public loginUser(user: User) {

    this.isAuthorized.emit(true);
      localStorage.setItem('user-login', user.login);

  }

  public logOutUser() {

    localStorage.removeItem('user-login');
    this.isAuthorized.emit(false);


  }

  public registrationUser(registrationForm: any) {

    localStorage.setItem('user-login', registrationForm.login);
    this.isAuthorized.emit(true);

  }

}
