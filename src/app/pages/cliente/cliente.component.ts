import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // 🔹 Necesario para ngModel

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  usuario: any = null;
  usuarioEdit: any = null;       // 🔹 Copia para editar en modal
  modalVisible: boolean = false; // 🔹 Controla si el modal se ve

  private router = inject(Router);
  private http = inject(HttpClient);
  private zone = inject(NgZone);

  ngOnInit(): void {
    // Cargar usuario guardado en localStorage (si existe)
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }

    // Actualizar datos desde backend
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any>('http://localhost:8080/usuario/perfil', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.zone.run(() => {
          this.usuario = data;
          localStorage.setItem('usuario', JSON.stringify(data)); // Guardar para persistencia
        });
        console.log('PERFIL OK 👉', data);
      },
      error: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
      }
    });
  }

  // 🔹 Abrir modal
  abrirModal() {
    this.usuarioEdit = { ...this.usuario }; // Hacer copia para edición
    this.modalVisible = true;
  }

  // 🔹 Cerrar modal sin guardar
  cerrarModal() {
    this.modalVisible = false;
    this.usuarioEdit = null;
  }

  // 🔹 Guardar cambios y cerrar modal
  guardarCambios() {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Enviar PUT al backend para actualizar
    this.http.put<any>('http://localhost:8080/usuario/perfil', this.usuarioEdit, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: res => {
        this.usuario = { ...this.usuarioEdit }; // Actualizar datos locales
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.modalVisible = false; // 🔹 Cierra modal automáticamente
        this.usuarioEdit = null;
        console.log('Perfil actualizado ✅', res);
      },
      error: err => {
        console.error('Error al actualizar perfil ❌', err);
        alert('No se pudo actualizar el perfil');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
