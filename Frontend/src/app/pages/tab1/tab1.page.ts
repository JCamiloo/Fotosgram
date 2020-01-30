import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  postSubscription: Subscription;
  enableInfiniteScroll = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
    this.postSubscription = this.postService.newPost.subscribe(post => this.posts.unshift(post));
  }

  doRefresh(event) {
    this.loadPosts(event, true);
    this.posts = [];
    this.enableInfiniteScroll = true;
  }

  loadPosts(event?, pull: boolean = false) {
    this.postService.getPosts(pull).subscribe(resp => {
      this.posts.push(...resp.data.posts);
        event && event.target.complete(); 
        (resp.data.posts.length === 0) && (this.enableInfiniteScroll = false);
    });
  }
}