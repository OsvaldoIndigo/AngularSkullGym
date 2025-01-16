import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule],
  templateUrl: './colaborador-detail.component.html',
  styleUrl: './colaborador-detail.component.css'
})
export class CollaboratingDetailComponent implements OnInit {
  public colabData: Collaborating | null = null;
  public displayedColumns: string[] = [
    'id',
    'nombre_completo',
    'correo_electronico',
    'contrasena',
    'telefono',
    'fecha_nacimiento',
    'direccion',
    'tipo_usuario',
    'rol_empresa',
    'salario',
    'fecha_ingreso'
  ];
  public dataSource: Collaborating[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  }


}
