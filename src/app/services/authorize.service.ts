import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  private isAuthorized = new Subject<boolean>();
  public isAuthorized$ = this.isAuthorized.asObservable();

  constructor() {

    this.setAuthorized(this.checkAuth());

  }

  public getUser():User {

    let log = localStorage.getItem('user-login')||"";
    let pas = localStorage.getItem('user-password')||"";

    return new User(log, pas);

  }

  public getCurrentUser():string|null {

    return localStorage.getItem('login');

  }

  public checkAuth(): boolean {

    return (this.getCurrentUser() != null) ? true : false;

  }

  private setAuthorized(status: boolean) {

    this.isAuthorized.next(status);

  }

  public loginUser(user: User):boolean {

    let regUser = this.getUser();

    if (user.login == regUser.login && user.password == regUser.password) {

      localStorage.setItem('login', user.login);
      this.setAuthorized(true);

      return true;

    }

    return false;
  }

  public logOutUser() {

    localStorage.removeItem('login');
    this.setAuthorized(false);

  }

  public registrationUser(registrationForm: any):boolean {

    let checkExist = localStorage.getItem('user-login') || "";

    if (checkExist === registrationForm.login) {
      return false;
    }

    localStorage.setItem('user-login', registrationForm.login);
    localStorage.setItem('user-password', registrationForm.password);

    return this.loginUser(new User(registrationForm.login, registrationForm.password));

  }

}
