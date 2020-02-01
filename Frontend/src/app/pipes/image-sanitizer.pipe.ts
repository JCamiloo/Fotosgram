import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(img: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }
}
