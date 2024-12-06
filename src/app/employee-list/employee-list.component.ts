import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborating } from '../colaborador-detail/colaborador-detail.component';
import { CollaboratingService } from '../registro-colaborador/empleadoServices';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  public colaboradores: Collaborating[] = [];

  constructor(
    private CollaboratingService: CollaboratingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCollaborating();
  }

  loadCollaborating() {
    this.colaboradores = this.CollaboratingService.getAllCollaborators();
  }

  viewDetails(idCollaborating: string) {
    this.router.navigate(['/colaborador-detail', idCollaborating]);
  }
}
