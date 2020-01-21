import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(private userSrv: UserService) {}
  
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userSrv.checkToken();
  }
}
