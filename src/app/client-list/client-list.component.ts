import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../client-detail/client-detail.component';
import { ClientService } from '../client-detail/client.services';
@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  imports: [CommonModule],
})
export class ClientListComponent implements OnInit {
  public clients: Client[] = [];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clients = this.clientService.getAllClients();
  }

  viewDetails(idUsuario: string) {
    this.router.navigate(['/client-detail', idUsuario]);
  }
}
