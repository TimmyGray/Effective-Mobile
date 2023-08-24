import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../models/post';
import { Subscription, map, exhaustMap } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post!: Post;
  // paramsSubscription: Subscription;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly postsserv: PostsService,
    private readonly authserv: AuthorizeService,
    private readonly router: Router) {

    this.checkForAuth();

    //this variant for get post without http request to server

    //this.paramsSubscription = this.route.params.pipe(
    //  map(params => this.post.id = parseInt(params['id'])),
    //  exhaustMap(() => this.route.queryParams),
    //  map(qparams => {
    //    this.post.userId = +qparams['userId'];
    //    this.post.title = qparams['title'];
    //    this.post.body = qparams['body'];
    //  })
    //).subscribe();

  }

  ngOnInit() {

    this.route.params.pipe(
      map(params => +params['id']),
      exhaustMap(id => this.postsserv.getPost(id))
    ).subscribe({

      next: (post => this.post = post),
      error: (error => {
        console.log(error);
        alert(error);
      })

    });

  }

  ngOnDestroy() {


    // this.paramsSubscription.unsubscribe();

  }

  private checkForAuth() {

    if (!this.authserv.checkAuth()) {

      this.router.navigate(['/authorize']);

    }

  }

  public goBack() {

    this.location.back();

  }

}
