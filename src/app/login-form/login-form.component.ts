import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule], // Incluir HttpClientModule
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  idAdmin: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    const loginData = {
      correoElectronico: this.idAdmin,
      contrasena: this.password,
    };

    this.http.post('http://localhost:3000/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);

        // Redirigir al componente si el login es exitoso
        this.router.navigate(['/menu-services']);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        alert('Credenciales incorrectas o error en el servidor.');
      },
    });
  }
}
