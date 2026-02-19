import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  usuario: any = null;

  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit(): void {

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }


    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }


    this.http.get<any>('http://localhost:8080/usuario/perfil', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.usuario = data;
        localStorage.setItem('usuario', JSON.stringify(data));
      },
      error: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
      }
    });
  }


  editarPerfil() {
    localStorage.setItem('usuarioEdit', JSON.stringify(this.usuario));
    this.router.navigate(['/perfil/editar']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
