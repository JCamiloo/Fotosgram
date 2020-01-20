import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginResponse, UserLogin, UserRegister } from './../interfaces/interfaces';

const URL = environment.url;
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  constructor(private http: HttpClient) { }

  login(credentials: UserLogin) {
    return new Promise(resolve => {
      this.http.post<LoginResponse>(`${URL}/user/login`, credentials).subscribe(response => {
        if (response.success) {
          this.saveToken(response.data.token);
          resolve(true);
        } else {
          this.token = null;
          Storage.clear();
          resolve(false);
        }
      });
    });
  }

  registerUser(registerForm: UserRegister) {
    return new Promise(resolve => {
      this.http.post<LoginResponse>(`${URL}/user/create`, registerForm).subscribe(response => {
        if (response.success) {
          this.token = response.data.token;
          resolve(true);
        } else {
          this.token = null;
          Storage.clear();
          resolve(false);
        }
      });
    })
  }

  async saveToken(token: string) {
    this.token = token;
    await Storage.set({ key: 'token', value: this.token });
  }
}
