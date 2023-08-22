import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Router,} from '@angular/router';

import { PostsService } from '../services/posts.service';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {

  isTableView: boolean = false;
  isGridView: boolean = true;

  posts: Post[];

  columnsToDisplay: string[] = ['userid', 'id', 'title', 'body'];

  constructor(
    private readonly postsserv: PostsService,
      private readonly authserv: AuthorizeService,
      private readonly router: Router) {

    this.checkForAuth();

      this.posts = [];

  }

    ngOnInit() {
     
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


  checkForAuth() {

    if (!this.authserv.checkAuth()) {

      this.router.navigate(['/authorize']);

    }

  }

  selectPost(post: Post) {

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

  changeView() {

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

}
