import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private readonly httpclient: HttpClient) { }

  public getPosts(): Observable<Post[]> {

    return this.httpclient.get<Post[]>(this.url);

  }

  public getPost(id: number): Observable<Post> {

    return this.httpclient.get<Post>(this.url + `/${id}`);

  }

}
