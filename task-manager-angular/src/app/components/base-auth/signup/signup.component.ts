import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import User from 'src/app/models/User';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userData: User = {username: "", email: "", password: ""};

  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder, 
              private service: SignupService,
              private router: Router) {}

  signup(): void {
    console.log("SignUpComponent.signup()");

    this.userData.username = this.signupForm.value.username!;
    this.userData.email = this.signupForm.value.email!;
    this.userData.password = this.signupForm.value.password!;

    if (this.userData.password != this.signupForm.value.confirm_password) {
      alert("Password do not match");
      return;
    }

    this.service.signup(this.userData).subscribe(
      () => {
        alert("Account registered with sucessfull. Redirecting to login page.");
        this.router.navigate(['/login'])
      },
      (error) => {
        console.log(error)
        alert(Object.values(error.error).join("\n"))
      }
    )
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.signupForm.controls;
  }
}
