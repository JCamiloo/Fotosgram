import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'buildImage'
})
export class BuildImagePipe implements PipeTransform {

  transform(image: string, userId: string): string {
    return `${environment.url}/post/image/${userId}/${image}`;
  }
}
