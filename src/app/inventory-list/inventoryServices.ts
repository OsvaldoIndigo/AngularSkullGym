import { Injectable } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { BehaviorSubject } from 'rxjs';
export interface Inventory {
  idEquipment: string; // ID único para identificar el equipo
  name: string;
  model: string;
  description: string;
  registrationDate: string;
  state: string;
  weight: string; // Permitir null
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
  getEquipmentById(id: string): Inventory | null {
    return this.getAllEquipment().find((item) => item.idEquipment === id) || null;
  }
  //obtener todos los equipos
  getAllEquipment(): Inventory[] {
    const storedInventories = localStorage.getItem(this.storageKey);
    return storedInventories ? JSON.parse(storedInventories) : [];
  }
}
