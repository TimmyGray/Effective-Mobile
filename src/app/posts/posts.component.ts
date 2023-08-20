import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],

    providers: [PostsService]
})
export class PostsComponent implements OnInit {

    posts: Post[];

    constructor(private readonly postsserv: PostsService) {

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

    }

}
