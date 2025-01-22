import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-colaborador',
  standalone: true,
  imports: [    
    ReactiveFormsModule,  // Add ReactiveFormsModule here
    HttpClientModule], // Include HttpClientModule here
  templateUrl: './registro-colaborador.component.html',
  styleUrls: ['./registro-colaborador.component.css'],
})
export class RegistroColaboradorComponent {
  public registroForm: FormGroup;
  @Output() registroCompletado = new EventEmitter<any>();
  private apiUrl = 'http://localhost:3000/crear-empleado';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // HttpClient injection


    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nameCollaborating: ['', Validators.required],
      roleCollaborating: ['', Validators.required], // Debe tener un valor inicial que no sea inválido
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      birthdateCollaborating: ['', Validators.required],
      directionCollaborating: ['', Validators.required],
      salaryCollaborating: ['', Validators.required],
      dateOfEntry: ['', Validators.required],
    });
    
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const colabData = this.registroForm.value;

      const dataEmpleado = {
        nombreCompleto: colabData.nameCollaborating,
        correoElectronico: colabData.correoElectronico,
        contrasena: colabData.contrasena,
        telefono: colabData.telefono,
        fechaNacimiento: colabData.birthdateCollaborating,
        direccion: colabData.directionCollaborating,
        rol_empresa: colabData.roleCollaborating,
        salario: colabData.salaryCollaborating,
        fecha_ingreso: colabData.dateOfEntry,
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
