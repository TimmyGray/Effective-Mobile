import { Component, Input } from '@angular/core';
import {  } from '@angular/forms';

import { Post} from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post!: Post;

}
