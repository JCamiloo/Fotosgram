import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Plugins, CameraResultType, CameraSource, Capacitor, CameraOptions } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';

const { Geolocation, Camera } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  post: Partial<Post> = { message: '', coords: null };
  position: boolean = false;
  locationSpinner: boolean = false;
  tempImages: string[] = [];

  constructor(private postSrv: PostService, 
              private UtilsSrv: UtilsService,
              private sanitizer: DomSanitizer) {}

  async createPost() {
    await this.postSrv.createPost(this.post);
    this.post = { message: '', coords: null };
    this.UtilsSrv.createToast('Post creado!');
  }

  async getCurrentPosition() {
    if (!this.position) {
      this.post.coords = null;
      return;
    }
    this.locationSpinner = true;
    Geolocation.getCurrentPosition().then(position => {
      const coordinates = `${position.coords.latitude},${position.coords.longitude}`
      this.post.coords = coordinates;
      this.locationSpinner = false;
    }).catch(() => this.locationSpinner = false);
  }

  async takePicture() {
    const cameraOptions: CameraOptions = {
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true,
      correctOrientation: true,
      source: CameraSource.Camera
    };

    Camera.getPhoto(cameraOptions).then(image => {
      const img = Capacitor.convertFileSrc(image.dataUrl);
      this.tempImages.push(img);
    }).catch( error => console.log(error));
  }
}
