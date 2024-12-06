import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-services',
  standalone: true,
  imports: [],
  templateUrl: './menu-services.component.html',
  styleUrl: './menu-services.component.css'
})
export class MenuServicesComponent {
  constructor(private router: Router) {}
  loggedUser: string = 'admin@example.com';
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  logout() {
    // Redirige al login
    this.router.navigate(['/login-form']);
  }
}
