import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  post: Partial<Post> = {};
  tempImages: string[] = [];
  postForm: FormGroup;

  constructor(private userSrv: UserService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      message: ['', Validators.required],
      coords: [null],
      position: [false]
    });
  }

  createPost() {
    console.log(this.postForm.getRawValue());
  }
}
