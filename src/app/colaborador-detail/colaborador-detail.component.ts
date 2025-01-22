import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Collaborating {
  id: string;
  nombre_completo: string;
  correo_electronico: string;
  contrasena: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;
  tipo_usuario: string;
  rol_empresa: string;
  salario: string;
  fecha_ingreso: string;
}

@Component({
  selector: 'app-colaborador-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './colaborador-detail.component.html',
  styleUrls: ['./colaborador-detail.component.css']
})
export class CollaboratingDetailComponent implements OnInit {
  public colabData: Collaborating | null = null;
  public isLoading = true; // Mostrar un indicador de carga
  public employeeForm!: FormGroup; // Formulario reactivo

  // Definir las columnas que se mostrarán en la tabla
  public displayedColumns: string[] = [
    'id',
    'nombre_completo',
    'correo_electronico',
    'telefono',
    'fecha_nacimiento',
    'direccion',
    'tipo_usuario',
    'rol_empresa',
    'salario',
    'fecha_ingreso'
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient, // Inyectar HttpClient aquí
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Cargar datos del empleado
      this.http.get<Collaborating>(`http://localhost:3000/obtener_detelle_empleado/${id}`).subscribe({
        next: (data: Collaborating) => {
          // Convertir fechas al formato requerido por los inputs tipo date
          data.fecha_nacimiento = this.formatDateForInput(data.fecha_nacimiento);
          data.fecha_ingreso = this.formatDateForInput(data.fecha_ingreso);

          this.colabData = data;
          this.isLoading = false;

          // Inicializar formulario con validación y datos del empleado
          this.employeeForm = this.fb.group({
            nombre_completo: [data.nombre_completo, [Validators.required, Validators.maxLength(100)]],
            correo_electronico: [data.correo_electronico, [Validators.required, Validators.email]],
            telefono: [data.telefono, [Validators.required, Validators.pattern('^\\d{10}$')]],
            fecha_nacimiento: [data.fecha_nacimiento, Validators.required],
            direccion: [data.direccion, [Validators.required, Validators.maxLength(200)]],
            tipo_usuario: [data.tipo_usuario, Validators.required],
            rol_empresa: [data.rol_empresa, Validators.required],
            salario: [data.salario, [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]],
            fecha_ingreso: [data.fecha_ingreso, Validators.required]
          });
        },
        error: (error: any) => {
          console.error('Error al cargar los detalles del empleado:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('ID de empleado no proporcionado');
      this.isLoading = false;
    }
  }

  onUpdate() {
    if (this.employeeForm.valid) {

      const updatedData = { ...this.colabData, ...this.employeeForm.value };

      console.log('Entro a actualizar el empleado');

      console.log(updatedData);


      this.http.post(`http://localhost:3000/actualizar_empleado`, updatedData).subscribe({
        next: () => {

          alert('Empleado actualizado correctamente');
        },
        error: (error: any) => {
          console.error('Error al actualizar el empleado:', error);
        }
      });
    } else {
      console.error('El formulario no es válido', this.employeeForm.errors);
    }
  }

  // Método para convertir fechas al formato YYYY-MM-DD
  private formatDateForInput(date: string): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }
}
