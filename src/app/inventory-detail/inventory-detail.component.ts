import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  InventoryServices,
  Inventory,
} from '../inventory-list/inventoryServices';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inventory-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-detail.component.html',
  styleUrl: './inventory-detail.component.css',
})
export class InventoryDetailComponent implements OnInit {
  public equipmentData: Inventory | null = null;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryServices,
    private router: Router
  ) {}

  ngOnInit() {
    const idEquipment = this.route.snapshot.paramMap.get('idEquipment');
    this.loadEquipmentDetails(idEquipment);
  }

  loadEquipmentDetails(idEquipment: string | null) {
    if (idEquipment) {
      this.equipmentData = this.inventoryService.getEquipmentById(idEquipment);
      if (!this.equipmentData) {
        alert('No se encontró el equipo con el ID proporcionado.');
      }
    } else {
      alert('No se proporcionó un ID de equipo.');
    }
  }
  goBack() {
    this.router.navigate(['/inventory-list']);
  }
}
