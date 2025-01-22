import { CommonModule } from '@angular/common'; // Asegúrate de que esto esté importado
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.html',
  styleUrls: ['./registro-cliente.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
  ],
})
export class RegistroClienteComponent {
  public registroForm: FormGroup;
  @Output() registroCompletado = new EventEmitter<any>();

  private apiUrl = 'http://localhost:3000/crear-cliente';



  constructor(
    private fb: FormBuilder,
    private router: Router,
        private http: HttpClient, // HttpClient injection
  
  ) {
    this.registroForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      tipoMembresia: ['', Validators.required],
      fechaInicioMembresia: ['', Validators.required],
      TipoDinamica: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const colabData = this.registroForm.value;

      const dataEmpleado = {
        nombreCompleto: colabData.nombreCompleto,
        correoElectronico: colabData.correoElectronico,
        contrasena: colabData.contrasena,
        telefono: colabData.telefono,
        fechaNacimiento: colabData.fechaNacimiento,
        direccion: colabData.direccion,
        tipoMembresia: colabData.tipoMembresia,
        TipoDinamica: colabData.TipoDinamica,
        fechaInicioMembresia: colabData.fechaInicioMembresia
      };

      this.http.post<{ usuarioId: string }>(this.apiUrl, dataEmpleado).subscribe({  
        next: (response) => {
          console.log('Empleado guardado con éxito:', response);
          this.router.navigate(['/employee-list']);
        },
        error: (error) => {
          console.error('Error al guardar el empleado:', error);
        },
      });
    } else {
      console.log('Formulario no válido ');
    }
  }
}

