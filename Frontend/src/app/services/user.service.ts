import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Credentials } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  constructor(private http: HttpClient) { }

  login(credentials: Credentials) {
    this.http.post(`${URL}/user/login`, credentials).subscribe(data => console.log(data));
  }
}
