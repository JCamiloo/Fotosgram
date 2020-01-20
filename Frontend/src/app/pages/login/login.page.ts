import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', {static: true}) mainSlide: IonSlides;
  showLoginButton = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private userSrv: UserService, 
              private formBuilder: FormBuilder,
              private navCtrl: NavController,
              private utilsSrv: UtilsService) { 
    this.initForms();
  }

  ngOnInit() {
    this.mainSlide.lockSwipes(true);
  }

  async login() {
    const valid = await this.userSrv.login(this.loginForm.getRawValue());
    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.utilsSrv.createToast('Usuario/Contrañesa inválidos');
    }
  }

  async register() {
    const valid = await this.userSrv.registerUser(this.registerForm.getRawValue());
    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.utilsSrv.createToast('Correo en uso');
    }
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

  initForms() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.registerForm = this.formBuilder.group({
      avatar: new FormControl('av-1.png'),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get avatarField() {
    return this.registerForm.get('avatar');
  }
}
