import { LoginResponse } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Credentials } from '../interfaces/interfaces';
import { UtilsService } from './utils.service';
import { NavController } from '@ionic/angular';
import { resolve } from 'url';

const URL = environment.url;
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  constructor(private http: HttpClient) { }

  login(credentials: Credentials) {
    return new Promise(resolve => {
      this.http.post<LoginResponse>(`${URL}/user/login`, credentials).subscribe(response => {
        if (response.success) {
          this.saveToken(response.data.token).then((data) => console.log(data)).catch(erro => console.log(erro));
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await Storage.set({ key: 'token', value: this.token });
  }
}
