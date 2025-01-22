import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title // Aquí el tipo de argumento es un arreglo de cadenas (string[])
    (title: any) {
      throw new Error('Method not implemented.');
  }

  constructor(private router: Router) {}

  // Método para redirigir al menú
  goToMenu() {
    // Aquí el tipo de argumento es un arreglo de cadenas (string[])
    this.router.navigate(['/menu-services']);
  }
}
