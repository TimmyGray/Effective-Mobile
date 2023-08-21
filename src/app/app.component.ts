import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';

import { AuthorizeService } from './services/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers:[AuthorizeService]
})
export class AppComponent implements OnInit {

    title = 'Effective-Mobile';
    isAuthorized: boolean = false;

    constructor(
        private readonly authservice: AuthorizeService,
        private readonly router: Router) {


    }
    ngOnInit() {

        this.authservice.isAuthorized$.subscribe({
            next: (is_authorized => {
                this.isAuthorized = is_authorized;
                console.log(is_authorized);
            })
        });

        this.isAuthorized = this.authservice.checkUser();

    }

    logout() {

        this.authservice.logOutUser();
        this.router.navigate(['/authorize']);

    }

    check() {

        if (!this.isAuthorized) {
            this.authservice.loginUser(new User('', ''));
        }
        else {

            this.authservice.logOutUser();
        }

    }
}
