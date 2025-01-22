import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  @Output() equipmentRegistered = new EventEmitter<any>();

  private apiUrl = 'http://localhost:3000/crear-equipos';

  // Modelo para los datos del equipo
  equipment = {
    name: '',
    model: '',
    description: '',
    state: '',
    weight: '', // Inicializar como un número
  };

  constructor(
    private router: Router,
    private http: HttpClient, // HttpClient injection
    
  ) {} // Arreglo para almacenar los equipos registrados
  registerEquipment() {
    if (
      this.equipment.name &&
      this.equipment.model &&
      this.equipment.state &&
      this.equipment.weight // !== null//
    ) {


      const dataInventory = {
        nombre: this.equipment.name,
        modelo: this.equipment.model,
        descripcion: this.equipment.description,
        estado: this.equipment.state,
        peso: this.equipment.weight
      }

      this.http.post<{ usuarioId: string }>(this.apiUrl, dataInventory).subscribe({  
        next: (response) => {
          console.log('Empleado guardado con éxito:', response);
          this.router.navigate(['/employee-list']);
        },
        error: (error) => {
          console.error('Error al guardar el empleado:', error);
        },
      });
      
      // Reiniciar el formulario
      this.equipment = {
        name: '',
        model: '',
        description: '',
        state: '',
        weight: '',
      };

      // Navegar al listado
      //this.router.navigate(['/inventory-list']);
      alert('Equipo registrado con éxito!');
    } else {
      alert('Por favor llena todos los campos obligatorios.');
    }
  }
}
