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
import { ClientService } from '../client-detail/client.services';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.registroForm = this.fb.group({
      idUsuario: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
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
      const clientData = this.registroForm.value;
      console.log('Formulario válido', clientData);

      // Guardar datos a través del servicio
      this.clientService.saveClient(clientData);

      // Emitir evento de registro completado
      this.registroCompletado.emit(clientData);

      // Redirigir al componente de detalles del cliente
      this.router.navigate(['/client-detail', clientData.idUsuario]);
    } else {
      console.log('Formulario no válido');
      // Aquí puedes agregar más lógica para mostrar errores al usuario
    }
  }
}
