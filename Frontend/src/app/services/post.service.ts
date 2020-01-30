import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Post, PostsResponse, PostResponse } from './../interfaces/interfaces';
import { EventEmitter } from '@angular/core';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postPages = 0;
  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient) { }

  getPosts(pull: boolean = false) {
    if (pull) {
      this.postPages = 0;
    }
    this.postPages++;
    return this.http.get<PostsResponse>(`${URL}/post/?page=${this.postPages}`)
  }

  createPost(post: Partial<Post>) {
    return new Promise(resolve => {
      this.http.post<PostResponse>(`${URL}/post`, post).subscribe(response => {
        if (response.success) {
          this.newPost.emit(response.data);
          resolve();
        }
      });
    });
  }
}
