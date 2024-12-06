import { Component } from '@angular/core';
import { RouterOutlet,Router,Routes,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule,RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  idAdmin: string = '';
  password: string = '';
    
    constructor(private router: Router) {} // Inyectar el Router en el constructor
  
    onLogin() {
      if (this.idAdmin === '123456' && this.password === '54321') {
        // Redirigir al componente de registro de cliente si las credenciales son correctas
        this.router.navigate(['/menu-services']);
      } else {
        console.log('Credenciales incorrectas');
      }
    }

}
