import { Injectable } from '@angular/core';
import { Collaborating } from '../colaborador-detail/colaborador-detail.component';
@Injectable({
  providedIn: 'root',
})
export class CollaboratingService {
  private storageKey = 'colaboradores';

  // Guardar colaborador
  saveCollaborating(colabData: Collaborating) {
    const colaboradores = this.getAllCollaborators();
    colaboradores.push(colabData);
    localStorage.setItem(this.storageKey, JSON.stringify(colaboradores));
  }
  // Obtener colaborador por ID
  getColabById(idCollaborating: string): Collaborating | null {
    const colaboradores = this.getAllCollaborators();
    return (colaboradores.find((colab) => colab.idCollaborating === idCollaborating) || null );
  }
  // Obtener todos los colaboradores
  getAllCollaborators(): Collaborating[] {
    const storedColabs = localStorage.getItem(this.storageKey);
    return storedColabs ? JSON.parse(storedColabs) : [];
  }
}
