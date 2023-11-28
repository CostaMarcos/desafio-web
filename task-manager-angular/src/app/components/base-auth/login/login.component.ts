import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import Auth from '../../../models/Auth';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: Auth = {username: "", password: ""};

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder, private service: AuthService, private localStorageService: LocalStorageService, private router:Router) { }

  login (): void {
    console.log("LoginComponent.login()");

    this.loginData.username = this.loginForm.value.username!;
    this.loginData.password = this.loginForm.value.password!;

    this.service.auth(this.loginData).subscribe((resp) => {
      console.log(resp)  
      this.localStorageService.setObject(resp);

      this.router.navigate(['tasks'])
    })
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}