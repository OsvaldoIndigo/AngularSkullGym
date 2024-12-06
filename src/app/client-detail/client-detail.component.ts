import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from './client.services';

export interface Client {
  idUsuario: string;
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  fechaNacimiento: string;
  direccion: string;
  tipoMembresia: string;
  fechaInicioMembresia: string;
  TipoDinamica: string;
}
@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
  providers: [],
})
export class ClientDetailComponent implements OnInit {
  public clientData: Client | null = null;
  public displayedColumns: string[] = [
    'idUsuario',
    'nombreCompleto',
    'correoElectronico',
    'telefono',
    'fechaNacimiento',
    'direccion',
    'tipoMembresia',
    'fechaInicioMembresia',
    'TipoDinamica',
  ];
  public dataSource: Client[] = [];
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    const idUsuario = this.route.snapshot.paramMap.get('id');
    this.loadClientDetails(idUsuario);
  }

  loadClientDetails(idUsuario: string | null) {
    if (idUsuario) {
      this.clientData = this.clientService.getClientById(idUsuario);
      if (this.clientData) {
        this.dataSource = [this.clientData]; // Coloca clientData en un array para usar como dataSource
      } else {
        alert('No se encontró el cliente con el ID proporcionado.');
      }
    } else {
      alert('No se proporcionó un ID de usuario.');
    }
  }
}
