import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  usuarioEdit: any = null;

  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit() {
    const datos = localStorage.getItem('usuarioEdit');
    if (datos) {
      this.usuarioEdit = JSON.parse(datos);
    } else {

      this.router.navigate(['/perfil']);
    }
  }

  guardarCambios() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.put('http://localhost:8080/usuario/perfil', this.usuarioEdit, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
    
        localStorage.setItem('usuario', JSON.stringify(this.usuarioEdit));
        this.router.navigate(['/perfil']); 
      },
      error: () => alert('No se pudo actualizar el perfil')
    });
  }

  cancelar() {
    this.router.navigate(['/perfil']); 
  }
  soloLetras(event: KeyboardEvent): boolean {
  const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
  return pattern.test(event.key);
}

soloNumeros(event: KeyboardEvent): boolean {
  const pattern = /^[0-9]$/;
  return pattern.test(event.key);
}
}
