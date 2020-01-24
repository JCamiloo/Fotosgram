import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginResponse, UserLogin, UserRegister, User, CheckTokenResponse, UpdateUserResponse } from './../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: Partial<User> = {}

  constructor(private http: HttpClient, private navCtrl: NavController) { }

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

  updateUser(user: User) {
    return new Promise(resolve => {
      this.http.post<UpdateUserResponse>(`${URL}/user/update`, user).subscribe(response => {
        if (response.success) {
          this.saveToken(response.data);
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

  async checkToken(): Promise<boolean> {
    await this.loadToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({ 'x-token': this.token });
      this.http.get<CheckTokenResponse>(`${URL}/user/`, { headers }).subscribe(response => {
        if (response.success) {
          this.user = response.data;
          resolve(true);
        } else {
          this.user = {};
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      })
    });
  }

  getUsuario() {
    if(!this.user._id) {
      this.checkToken();
    }
    return { ...this.user };
  }

  async loadToken() {
    const { value } = await Storage.get({ key: 'token' }) || null;
    this.token = value;
  }
}
