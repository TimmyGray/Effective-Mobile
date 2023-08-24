import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  
})
export class PostsComponent implements OnInit, OnDestroy {

  destroyed: Subject<void> = new Subject();
  numberOfcols!: number;
  isTableView: boolean = false;
  isGridView: boolean = true;

  posts: Post[];

  columnsToDisplay: string[] = ['userid', 'id', 'title', 'body'];

  constructor(
    private readonly postsserv: PostsService,
    private readonly authserv: AuthorizeService,
    private readonly router: Router,
    private readonly breakpointobserver: BreakpointObserver) {

    this.checkForAuth();

    this.breakpointobserver.observe([
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (state => {

          for (let query of Object.keys(state.breakpoints)) {

            if (state.breakpoints[query]) {
              if (query === Breakpoints.Small) {
                this.numberOfcols = 1;
              }
              if (query === Breakpoints.Medium) {
                this.numberOfcols = 2;
              }
              if (query === Breakpoints.Large) {
                this.numberOfcols = 3;
              }
            }

          }

        })
      });
   

    this.posts = [];

  }

  ngOnInit() {

    this.numberOfcols = this.setColumsNumber();

    
    this.postsserv.getPosts().subscribe({

      next: ((all_posts: Post[]) => {

        this.posts = all_posts;

      }),

      error: (error => {

        console.error(error.message);
        alert(error.message);

      })

    })

    this.getView();

  }

  ngOnDestroy() {

    this.destroyed.next();
    this.destroyed.complete();

  }


  private checkForAuth() {

    if (!this.authserv.checkAuth()) {

      this.router.navigate(['/authorize']);

    }

  }

  public selectPost(post: Post) {

    //this variant for get post without http request to server
    //this.router.navigate(['/posts', post.id], {
    //  queryParams: {

    //    userId: post.userId,
    //    title: post.title,
    //    body: post.body

    //  }

    //});

    this.router.navigate(['/posts', post.id]);

  }

  public changeView() {

    if (this.isGridView) {
      this.tableView();
      localStorage.setItem('postsView', '0');
    }
    else {
      this.gridView();
      localStorage.setItem('postsView', '1');
    }

  }

  private gridView() {

    this.isGridView = true;
    this.isTableView = false;

  }

  private tableView() {

    this.isGridView = false;
    this.isTableView = true;
  }

  private getView() {

    let viewPosts = localStorage.getItem('postsView');
    if (viewPosts) {
      switch (viewPosts) {
        case "1": {

          this.gridView();
          break;
        }
        case "0": {

          this.tableView();
          break;
        }
        default:
      }

    }

  }

  private setColumsNumber() {

    if (window.innerWidth >= 1280) {
      return 3;
    }
    if (window.innerWidth >= 960) {
      return 2;
    }
    return 1;

  }

}
