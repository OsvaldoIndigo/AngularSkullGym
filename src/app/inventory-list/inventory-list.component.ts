import { Component, OnInit } from '@angular/core';
import {
  InventoryServices,
  Inventory,
} from '../inventory-list/inventoryServices';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  imports: [CommonModule],
})
export class InventoryListComponent implements OnInit {
  public equipmentList: Inventory[] = [];

  constructor(
    private inventoryService: InventoryServices,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios en la lista de equipos
    this.inventoryService.equipment$.subscribe((equipments) => {
      this.equipmentList = equipments;
    });
  }

  loadEquipmentList() {
    console.log('aqui estan los datos', this.inventoryService);
    this.equipmentList = this.inventoryService.getAllEquipment();
  }

  viewDetails(idEquipment: string) {
    this.router.navigate(['/inventory-detail', idEquipment]);
  }
}
