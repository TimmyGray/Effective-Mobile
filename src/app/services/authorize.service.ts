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

  public checkAuth(): boolean {

    let check = (localStorage.getItem('user-login') != null) ? true : false;
    return check;
  }

  private setAuthorized(status:boolean) {

    this.isAuthorized.next(status);

  }

  public loginUser(user: User) {

    this.setAuthorized(true);
      localStorage.setItem('user-login', user.login);

  }

  public logOutUser() {

    this.setAuthorized(false);
    localStorage.removeItem('user-login');
    
  }

  public registrationUser(registrationForm: any) {

    this.setAuthorized(true);
    localStorage.setItem('user-login', registrationForm.login);

  }

}
