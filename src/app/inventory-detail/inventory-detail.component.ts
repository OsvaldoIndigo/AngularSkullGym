import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inventory } from '../inventory-list/inventoryServices';

@Component({
  selector: 'app-inventory-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css'],
})
export class InventoryDetailComponent implements OnInit {
  public equipmentData: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idEquipment');
    console.log('Este es el id: ', id)
    this.loadEquipmentDetails(id);
  }

  loadEquipmentDetails(idEquipment: string | null) {
    if (idEquipment) {
      this.http.get<Inventory>(`http://localhost:3000/obtener_detalle_equipos/${idEquipment}`).subscribe(
        (data) => {
          this.equipmentData = data;
        },
        () => {
          this.showNotification('Error al cargar el equipo. Intente nuevamente.');
        }
      );
    } else {
      this.showNotification('No se proporcionó un ID de equipo.');
    }
  }

  updateEquipment() {
    if (this.equipmentData) {
      console.log('Este es el id: ', this.equipmentData)

      this.http.post(`http://localhost:3000/actualizar_productos`, this.equipmentData).subscribe(
        () => {
          alert('Equipo actualizado con éxito.');
          this.goBack();
        },
        () => {
          alert('Error al actualizar el equipo. Intente nuevamente.');
        }
      );
      
    }
  }

  goBack() {
    this.router.navigate(['/inventory-list']);
  }

  private showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Notification duration in milliseconds
    });
  }
}
