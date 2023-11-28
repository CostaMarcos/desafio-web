import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor (private authService: AuthService, private router: Router) {}

  logout(): void {
    console.log("NavbarComponent.logout()");
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
