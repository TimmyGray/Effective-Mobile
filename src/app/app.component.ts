import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizeService } from './services/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    title = 'Effective-Mobile';
  isAuthorized: boolean = false;

    constructor(
        private readonly authservice: AuthorizeService,
        private readonly router: Router) {

      
  }

  ngOnInit() {
    this.authservice.isAuthorized.subscribe({
      next: ((is_authorized: boolean) => {
        this.isAuthorized = is_authorized;

      })
    });   
    
   
       
  }


    logout() {

        this.authservice.logOutUser();
        this.router.navigate(['/authorize']);

    }

   
}
