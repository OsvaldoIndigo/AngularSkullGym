// client.service.ts
import { Injectable } from '@angular/core';
import { Client } from './client-detail.component'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private storageKey = 'clientes';
  // Guardar cliente
  saveClient(clientData: Client) {
    const clients = this.getAllClients();
    clients.push(clientData);
    localStorage.setItem(this.storageKey, JSON.stringify(clients));
  }

  // Obtener cliente por ID
  getClientById(idUsuario: string): Client | null {
    const clients = this.getAllClients();
    return clients.find((client) => client.idUsuario === idUsuario) || null;
  }

  // Obtener todos los clientes
  getAllClients(): Client[] {
    const storedClients = localStorage.getItem(this.storageKey);
    return storedClients ? JSON.parse(storedClients) : [];
  }
}
