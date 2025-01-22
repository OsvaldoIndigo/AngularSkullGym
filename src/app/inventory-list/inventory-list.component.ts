import { Component, OnInit } from '@angular/core';
import {
  InventoryServices,
  Inventory,
} from '../inventory-list/inventoryServices';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  imports: [CommonModule],
})
export class InventoryListComponent implements OnInit {
  public equipmentList: Inventory[] = [];
  public isLoading: boolean = true; // Inicializamos en true para mostrar "Cargando clientes..."

  constructor(
    private inventoryService: InventoryServices,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.isLoading = true; // Mostrar el mensaje de "Cargando clientes..."
    
    this.http.get<Inventory[]>('http://localhost:3000/equipos').subscribe({
      next: (data: Inventory[]) => {
        this.equipmentList = data;
        this.isLoading = false; // Ocultar el mensaje de carga
      },
      error: (error: any) => {
        console.error('Error al cargar la lista de clientes:', error);
        this.isLoading = false; // Ocultar el mensaje de carga en caso de error
      },
    });
  }

  viewDetails(idEquipment: string) {
    this.router.navigate(['/inventory-detail/', idEquipment]);
  }

  deleteEquipament(equipamentId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      this.isLoading = true;
      this.http.get(`http://localhost:3000/eliminar_productos/${equipamentId}`).subscribe(
        () => {
          // Eliminar de la lista de empleados localmente después de la eliminación
          this.equipmentList = this.equipmentList.filter(equipament => equipament.id !== equipamentId);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al eliminar el equipo', error);
          this.isLoading = false;
        }
      );
    }
  }

}
