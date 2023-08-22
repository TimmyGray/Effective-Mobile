import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizeService } from './services/authorize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthorized: boolean = false;
  authirizationSub!: Subscription;

    constructor(
        private readonly authservice: AuthorizeService,
      private readonly router: Router) {

  }


  ngOnInit() {

   
    this.authirizationSub = this.authservice.isAuthorized$.subscribe({

      next: ((is_authorized: boolean) => {
        this.isAuthorized = is_authorized;

      })
    });   

    this.isAuthorized = this.authservice.checkAuth();
       
  }

  ngOnDestroy() {

    this.authirizationSub.unsubscribe();

  }

    logout() {

        this.authservice.logOutUser();
        this.router.navigate(['/authorize']);

    }

   
}
