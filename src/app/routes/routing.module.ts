import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizeComponent } from '../authorize/authorize.component';
import { PostComponent } from '../post/post.component';
import { PostsComponent } from '../posts/posts.component';

const routes: Routes = [

  { path: 'authorize', component: AuthorizeComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
