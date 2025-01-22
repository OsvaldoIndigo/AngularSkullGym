import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../client-detail/client-detail.component';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule],
})
export class ClientListComponent implements OnInit {
  public clients: Client[] = [];
  public isLoading: boolean = true; // Inicializamos en true para mostrar "Cargando clientes..."

  constructor(private router: Router, private http: HttpClient) {} // Aquí se inyecta correctamente HttpClient

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.isLoading = true; // Mostrar el mensaje de "Cargando clientes..."

    this.http.get<Client[]>('http://localhost:3000/clientes').subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.isLoading = false; // Ocultar el mensaje de carga
      },
      error: (error: any) => {
        console.error('Error al cargar la lista de clientes:', error);
        this.isLoading = false; // Ocultar el mensaje de carga en caso de error
      },
    });
  }

  viewDetails(id: string) {
    this.router.navigate(['/client-detail', id]);
  }

  deleteClient(clientId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.isLoading = true;
      this.http.get(`http://localhost:3000/eliminar_empleado/${clientId}`).subscribe(
        () => {
          // Eliminar de la lista de empleados localmente después de la eliminación
          this.clients = this.clients.filter(employee => employee.id !== clientId);
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
