import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  post: Partial<Post> = {
    message: '',
    coords: null,
  };
  position: false;
  tempImages: string[] = [];

  constructor(private postSrv: PostService) {
  
  }

  createPost() {
    this.postSrv.createPost(this.post);
  }
}
