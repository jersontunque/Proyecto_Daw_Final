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
      // si no hay datos, volver al perfil
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
        // actualizar datos en localStorage para mostrar en perfil
        localStorage.setItem('usuario', JSON.stringify(this.usuarioEdit));
        this.router.navigate(['/perfil']); // volver al perfil
      },
      error: () => alert('No se pudo actualizar el perfil')
    });
  }

  cancelar() {
    this.router.navigate(['/perfil']); // volver al perfil sin guardar
  }
}
