import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export interface Client {
  id: string;
  nombre_completo: string;
  correo_electronico: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;
  tipo_membresia: string;
  fecha_inicio_membresia: string;
  tipo_dinamica: string;
}

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule,FormsModule],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
  providers: [],
})
export class ClientDetailComponent implements OnInit {
  public clientData: Client | null = null;
  public displayedColumns: string[] = [
    'id',
    'nombre_completo',
    'correo_electronico',
    'telefono',
    'fecha_nacimiento',
    'direccion',
    'tipo_membresia',
    'fecha_inicio_membresia',
    'tipo_dinamica',
  ];
  public dataSource: Client[] = [];
  public isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadClientDetails(id);
    } else {
      console.error('ID de cliente no proporcionado');
      this.isLoading = false;
    }
  }

  loadClientDetails(idUsuario: string) {
    this.http
      .get<Client>(`http://localhost:3000/detalle_cliente/${idUsuario}`)
      .subscribe({
        next: (data: Client) => {
          // // Formatear fechas para los inputs tipo date
          data.fecha_nacimiento = this.formatDateForInput(data.fecha_nacimiento);
          data.fecha_inicio_membresia = this.formatDateForInput(data.fecha_inicio_membresia);

          console.log(data)

          this.clientData = data;
          this.dataSource = [data];
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error al cargar los detalles del cliente:', error);
          this.isLoading = false;
        },
      });
  }

  formatDateForInput(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }

  updateClientDetails() {
    if (this.clientData) {
      this.http
        .post(`http://localhost:3000/detalle_cliente/${this.clientData.id}`, this.clientData)
        .subscribe({
          next: () => {
            alert('Detalles del cliente actualizados con éxito.');
          },
          error: (error: any) => {
            console.error('Error al actualizar los detalles del cliente:', error);
          },
        });
    }
  }
}
