import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user: Partial<User> = {};
  updateForm: FormGroup;
  avatar: string;

  constructor(private userService: UserService, 
              private formBuilder: FormBuilder,
              private utilsService: UtilsService) {
    this.updateForm = this.formBuilder.group({
      avatar: ['av-1.png'],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async ngOnInit() {
    this.user = await this.userService.getUsuario();
    this.avatar = this.user.avatar;
    this.updateForm.patchValue({ name: this.user.name, email: this.user.email });
  }

  async updateProfile() {
    const updated = await this.userService.updateUser(this.updateForm.getRawValue());
    if (updated) {
      this.utilsService.createToast('Usuario actualizado');
    } else {
      this.utilsService.createToast('No se pudo actualizar el usuario');
    }
  }

  avatarChanged(event: string) {
    this.updateForm.get('avatar').setValue(event);
    this.avatar = event;
  }

  logout() {
    this.userService.logout();
  }
}
