import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductoDetalle, Producto } from '../../model/producto';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  producto: ProductoDetalle | null = null;
  productosRelacionados: Producto[] = [];
  imagenActual: string = '';
  cantidad: number = 1;
  loading = true;
  agregandoCarrito = false;
  idUsuario = 1; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.cargarProducto(id);
      this.cargarRelacionados(id);
    });
  }

  cargarProducto(id: number) {
    this.loading = true;
    this.productoService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.imagenActual = data.imagenes.find(img => img.esPrincipal)?.urlImagen 
          || data.imagenes[0]?.urlImagen 
          || 'https://via.placeholder.com/600x400';
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        this.loading = false;
      }
    });
  }

  cargarRelacionados(id: number) {
    this.productoService.obtenerRelacionados(id, 4).subscribe({
      next: (data) => this.productosRelacionados = data,
      error: (err) => console.error('Error al cargar relacionados:', err)
    });
  }

  cambiarImagen(url: string) {
    this.imagenActual = url;
  }

  incrementarCantidad() {
    if (this.producto && this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregarAlCarrito() {
    if (!this.producto) return;

    if (this.cantidad > this.producto.stock) {
      alert('Stock insuficiente');
      return;
    }

    this.agregandoCarrito = true;
    const request = {
      idUsuario: this.idUsuario,
      idProducto: this.producto.idProducto,
      cantidad: this.cantidad
    };

    this.carritoService.agregarProducto(request).subscribe({
      next: (response) => {
        alert('Producto agregado al carrito');
        this.agregandoCarrito = false;
      },
      error: (err) => {
        alert('Error al agregar al carrito: ' + (err.error?.message || 'Error desconocido'));
        this.agregandoCarrito = false;
      }
    });
  }

  getPrecioFinal(): number {
    if (!this.producto) return 0;
    return this.producto.precioDescuento && this.producto.precioDescuento > 0 
      ? this.producto.precioDescuento 
      : this.producto.precioUnitario;
  }

  getDescuentoPorcentaje(): number {
    if (!this.producto) return 0;
    if (this.producto.precioDescuento && this.producto.precioDescuento > 0) {
      const descuento = this.producto.precioUnitario - this.producto.precioDescuento;
      return Math.round((descuento / this.producto.precioUnitario) * 100);
    }
    return 0;
  }

  getSubtotal(): number {
    return this.getPrecioFinal() * this.cantidad;
  }

  getPrecioFinalRelacionado(producto: Producto): number {
    return producto.precioDescuento && producto.precioDescuento > 0 
      ? producto.precioDescuento 
      : producto.precioUnitario;
  }
}