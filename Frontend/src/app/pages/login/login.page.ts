import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', {static: true}) mainSlide: IonSlides;
  avatarSlide = { slidesPerView: 3.5 };
  showLoginButton = false;
  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
  ];

  constructor() { }

  ngOnInit() {
    this.mainSlide.lockSwipes(true);
  }

  login(loginForm: NgForm) {

  }

  register(registerForm: NgForm) {

  }

  showRegister() {
    this.showLoginButton = true;
    this.mainSlide.lockSwipes(false);
    this.mainSlide.slideTo(1);
    this.mainSlide.lockSwipes(true);
  }

  showLogin() {
    this.showLoginButton = false;
    this.mainSlide.lockSwipes(false);
    this.mainSlide.slideTo(0);
    this.mainSlide.lockSwipes(true);
  }

  selectAvatar(avatar) {
    this.avatars.forEach(av => av.selected = false);
    avatar.selected = true;
  }
}
