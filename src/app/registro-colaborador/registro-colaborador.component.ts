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
import { CollaboratingService } from './empleadoServices';
@Component({
  selector: 'app-registro-colaborador',
  standalone: true,
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
  templateUrl: './registro-colaborador.component.html',
  styleUrl: './registro-colaborador.component.css',
})
export class RegistroColaboradorComponent {
  public registroForm: FormGroup;
  @Output() registroCompletado = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private CollaboratingService: CollaboratingService
  ) {
    this.registroForm = this.fb.group({
      idCollaborating: ['', Validators.required],
      nameCollaborating: ['', Validators.required],
      roleCollaborating: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]], // Cambiado
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Cambiado
      birthdateCollaborating: ['', Validators.required],
      directionCollaborating: ['', Validators.required],
      salaryCollaborating: ['', Validators.required],
      dateOfEntry: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.registroForm.valid) {
      const colabData = this.registroForm.value;
      console.log('Formulario válido', colabData);

      // Guardar datos a través del servicio
      this.CollaboratingService.saveCollaborating(colabData);

      // Emitir evento de registro completado
      this.registroCompletado.emit(colabData);

      // Redirigir al componente de detalles del cliente
      this.router.navigate(['/colaborador-detail', colabData.idCollaborating]);
    } else {
      console.log('Formulario no válido');
      // Aquí puedes agregar más lógica para mostrar errores al usuario
    }
  }
}
