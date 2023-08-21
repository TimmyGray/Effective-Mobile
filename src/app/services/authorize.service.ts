import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  private isAuthorized: Subject<boolean> = new Subject<boolean>();
  public isAuthorized$: Observable<boolean> = this.isAuthorized.asObservable();

  constructor() {
    this.isAuthorized.next(this.checkUser());
  }

  public checkUser(): boolean {

    return localStorage.getItem('user-login') != null;

  }

  public loginUser(user: User) {

      this.isAuthorized.next(true);
      localStorage.setItem('user-login', user.login);

  }

  public logOutUser() {

    localStorage.removeItem('user-login');
    this.isAuthorized.next(false);

  }

}
