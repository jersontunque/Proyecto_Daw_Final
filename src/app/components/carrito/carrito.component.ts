
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Carrito, DetalleCarrito } from '../../model/carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: Carrito | null = null;
  loading = true;
  idUsuario = 1; // Temporal

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.loading = true;
    this.carritoService.obtenerCarrito(this.idUsuario).subscribe({
      next: (data) => {
        this.carrito = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar carrito:', err);
        this.loading = false;
      }
    });
  }

  actualizarCantidad(detalle: DetalleCarrito, nuevaCantidad: number) {
    if (nuevaCantidad < 1 || nuevaCantidad > detalle.stockDisponible) {
      return;
    }

    this.carritoService.actualizarCantidad(detalle.idDetalle, this.idUsuario, nuevaCantidad).subscribe({
      next: () => this.cargarCarrito(),
      error: (err) => alert('Error al actualizar: ' + (err.error?.message || 'Error'))
    });
  }

  eliminarProducto(idDetalle: number) {
    if (confirm('¿Eliminar este producto del carrito?')) {
      this.carritoService.eliminarProducto(idDetalle, this.idUsuario).subscribe({
        next: () => this.cargarCarrito(),
        error: (err) => alert('Error al eliminar: ' + (err.error?.message || 'Error'))
      });
    }
  }

  vaciarCarrito() {
    if (confirm('¿Vaciar todo el carrito?')) {
      this.carritoService.vaciarCarrito(this.idUsuario).subscribe({
        next: () => this.cargarCarrito(),
        error: (err) => alert('Error: ' + (err.error?.message || 'Error'))
      });
    }
  }

  irACheckout() {
    if (!this.carrito || this.carrito.detalles.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}