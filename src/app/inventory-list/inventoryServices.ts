import { Injectable } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { BehaviorSubject } from 'rxjs';
export interface Inventory {
  id: string;
  nombre: string;
  modelo: string;
  descripcion: string;
  fecha_registro: Date;
  estado: string;
  peso: string; // Permitir null
}
@Injectable({
  providedIn: 'root',
})
export class InventoryServices {
  private storageKey = 'inventories';
  private equipmentSubject = new BehaviorSubject<Inventory[]>(
    this.getAllEquipment()
  );
  // Observable para suscribirse a los cambios
  equipment$ = this.equipmentSubject.asObservable();

  // Guardar un equipo
  saveEquipment(equipment: Inventory) {
    const inventories = this.getAllEquipment();
    inventories.push(equipment);
    localStorage.setItem(this.storageKey, JSON.stringify(inventories));
    this.equipmentSubject.next(inventories); // Emitir cambios
  }
  //OBTENER EQUIPO POR ID
  // Obtener equipo por ID

  //obtener todos los equipos
  getAllEquipment(): Inventory[] {
    const storedInventories = localStorage.getItem(this.storageKey);
    return storedInventories ? JSON.parse(storedInventories) : [];
  }
}
