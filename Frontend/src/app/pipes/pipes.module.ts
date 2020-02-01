import { NgModule } from '@angular/core';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';

@NgModule({
  declarations: [
    ImageSanitizerPipe
  ],
  exports: [
    ImageSanitizerPipe
  ]
})
export class PipesModule { }
