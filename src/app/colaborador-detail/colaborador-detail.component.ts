import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CollaboratingService } from '../registro-colaborador/empleadoServices';

export interface Collaborating {
  idCollaborating: string;
  nameCollaborating: string;
  roleCollaborating: string;
  emailColab: string; // Cambiado
  telefono: string;          // Cambiado
  birthdateCollaborating: string;
  directionCollaborating: string;
  salaryCollaborating: string;
  dateOfEntry: string;
}
@Component({
  selector: 'app-colaborador-detail',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule,],
  templateUrl: './colaborador-detail.component.html',
  styleUrl: './colaborador-detail.component.css'
})
export class CollaboratingDetailComponent implements OnInit{
  public colabData: Collaborating | null = null;
  public displayedColumns: string[] = [
    'idCollaborating',
    'nameCollaborating',
    'roleCollaborating',
    'emailColab',
    'telefono',
    'birthdateCollaborating',
    'directionCollaborating',
    'salaryCollaborating',
    'dateOfEntry'
  ];
  public dataSource: Collaborating[] = [];
  constructor(private route: ActivatedRoute, private collaboratingService: CollaboratingService) {

  }
  ngOnInit() {
    const idCollaborating = this.route.snapshot.paramMap.get('id');
    this.loadCollaboratingDetails(idCollaborating);
  }

  
  loadCollaboratingDetails(idCollaborating: string | null) {
    if (idCollaborating) {
      this.colabData = this.collaboratingService.getColabById(idCollaborating);
      if (this.colabData) {
        this.dataSource = [this.colabData];
      } else {
        alert('No se encontró el empleado con el ID proporcionado.');
      }
    } else {
      alert('No se proporcionó un ID de colaborador.');
    }
  }
}
