import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user: Partial<User> = {};
  updateForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.user = this.userService.getUsuario();
    this.updateForm.patchValue({ name: this.user.nombre, email: this.user.email });
    console.log(this.user);
  }

  updateProfile() {
    
  }

  logout() {
    
  }
}
