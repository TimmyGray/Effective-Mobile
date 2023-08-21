import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../models/post';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../services/posts.service';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],

  providers: [PostsService, AuthorizeService]
})
export class PostsComponent implements OnInit {

  isAuthorized: boolean = false;
    posts: Post[];

  constructor(
    private readonly postsserv: PostsService,
      private readonly authserv: AuthorizeService,
      private readonly router: Router,
      private readonly route: ActivatedRoute) {

      this.posts = [];

      this.authserv.isAuthorized$.subscribe({

          next: (is_authorized => {

              this.isAuthorized = is_authorized;

              if (this.isAuthorized) {

                  this.router.navigate(['/authorize']);

              }

          })

      });


  }

    ngOnInit() {

        this.isAuthorized = this.authserv.checkUser();
        if (!this.isAuthorized) {
            this.router.navigate(['/authorize']);
        }

        this.postsserv.getPosts().subscribe({

            next: ((all_posts: Post[]) => {

                this.posts = all_posts;

            }),

            error: (error => {

                console.error(error.message);
                alert(error.message);

            })
            
        })

    }

}
