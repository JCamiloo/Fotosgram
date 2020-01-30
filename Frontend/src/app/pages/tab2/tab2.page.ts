import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';
import { NavController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

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

  constructor(private postSrv: PostService, private UtilsSrv: UtilsService) {}

  async createPost() {
    await this.postSrv.createPost(this.post);
    this.post = { message: '', coords: null };
    this.UtilsSrv.createToast('Post creado!');
  }
}
