import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborating } from '../colaborador-detail/colaborador-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-colaborador-detail',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  public colaboradores: Collaborating[] = [];
  public isLoading = true; // Mostrar un indicador de carga

  constructor(
    private router: Router,
    private http: HttpClient // Inyectar HttpClient aquí
  ) {}

  ngOnInit() {
    this.loadCollaborating();
  }

  loadCollaborating() {
    this.isLoading = true;
    console.log('ENTRO AL SCRIPT');
    
    // Usar this.http que ya está inyectado correctamente
    this.http.get<Collaborating[]>('http://localhost:3000/usuarios-empleados').subscribe({
      next: (data: Collaborating[]) => {
        this.colaboradores = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar la lista de empleados:', error);
        this.isLoading = false;
      },
    });
  }

  viewDetails(idCollaborating: string) {
    this.router.navigate(['/colaborador-detail', idCollaborating]);
  }

  deleteEmployee(employeeId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.isLoading = true;
      this.http.get(`http://localhost:3000/eliminar_empleado/${employeeId}`).subscribe(
        () => {
          // Eliminar de la lista de empleados localmente después de la eliminación
          this.colaboradores = this.colaboradores.filter(employee => employee.id !== employeeId);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al eliminar el empleado', error);
          this.isLoading = false;
        }
      );
    }
  }
  
}
