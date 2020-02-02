import { NgModule } from '@angular/core';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { BuildImagePipe } from './build-image.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';

@NgModule({
  declarations: [
    ImageSanitizerPipe,
    BuildImagePipe,
    DomSanitizerPipe
  ],
  exports: [
    ImageSanitizerPipe,
    BuildImagePipe,
    DomSanitizerPipe
  ]
})
export class PipesModule { }
