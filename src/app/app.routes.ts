import { Routes } from '@angular/router';
import { RegistroClienteComponent } from './ClientRegistration/registro-cliente.componet'; // Asegúrate de corregir el nombre del archivo
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { CollaboratingDetailComponent } from './colaborador-detail/colaborador-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MenuServicesComponent } from './menu-services/menu-services.component';
import { RegistroColaboradorComponent } from './registro-colaborador/registro-colaborador.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login-form', pathMatch: 'full' },
  { path: 'login-form', component: LoginFormComponent },
  { path: 'registro-cliente', component: RegistroClienteComponent },
  { path: 'client-detail/:id', component: ClientDetailComponent },
  { path: 'menu-services', component: MenuServicesComponent },
  { path: 'colaborador-detail/:id', component: CollaboratingDetailComponent },
  { path: 'registro-colaborador', component: RegistroColaboradorComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'inventory-list', component: InventoryListComponent },
  { path: 'inventory-detail/:idEquipment', component: InventoryDetailComponent },
];
