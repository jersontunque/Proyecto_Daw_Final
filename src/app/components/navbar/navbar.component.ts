import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchTerm: string = '';
  totalItems: number = 0;
  idUsuario: number | null = null;

  constructor(
    private router: Router,
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener el id del usuario desde el token
    this.idUsuario = this.authService.obtenerIdUsuarioDelToken();

    if (this.idUsuario) {
      // Obtener carrito del usuario
      this.carritoService.obtenerCarrito(this.idUsuario).subscribe({
        next: (carrito) => {
          this.totalItems = carrito?.totalItems || 0;
        },
        error: (err) => {
          console.error('Error al obtener carrito:', err);
        }
      });
    }

    // Suscribirse al observable para actualizar totalItems dinámicamente
    this.carritoService.carrito$.subscribe(carrito => {
      this.totalItems = carrito?.totalItems || 0;
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/catalogo'], { queryParams: { search: this.searchTerm } });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
