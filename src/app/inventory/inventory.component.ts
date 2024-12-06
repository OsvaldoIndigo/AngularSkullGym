import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryServices } from '../inventory-list/inventoryServices';
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

  // Modelo para los datos del equipo
  equipment = {
    idEquipment: '',
    name: '',
    model: '',
    description: '',
    registrationDate: '',
    state: '',
    weight: '', // Inicializar como un número
  };

  constructor(
    private inventoryService: InventoryServices,
    private router: Router
  ) {} // Arreglo para almacenar los equipos registrados
  registerEquipment() {
    if (
      this.equipment.idEquipment&&
      this.equipment.name &&
      this.equipment.model &&
      this.equipment.state &&
      this.equipment.weight // !== null//
    ) {
      // Guardar el equipo en localStorage
      const equipmentToSave = {
        ...this.equipment,
      };
      this.inventoryService.saveEquipment(equipmentToSave);

      // Emitir el evento (si es necesario)
      this.equipmentRegistered.emit(equipmentToSave);

      // Reiniciar el formulario
      this.equipment = {
        idEquipment: '',
        name: '',
        model: '',
        description: '',
        registrationDate: '',
        state: '',
        weight: '',
      };

      // Navegar al listado
      this.router.navigate(['/inventory-list']);
      alert('Equipo registrado con éxito!');
    } else {
      alert('Por favor llena todos los campos obligatorios.');
    }
  }
}
