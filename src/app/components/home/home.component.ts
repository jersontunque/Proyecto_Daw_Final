import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { BannerService } from '../../services/banner.service';
import { CategoriaService } from '../../services/categoria.service';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banners: any[] = [];
  productosDestacados: Producto[] = [];
  categorias: any[] = [];
  loading = true;

  constructor(
    private productoService: ProductoService,
    private bannerService: BannerService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.cargarBanners();
    this.cargarProductosDestacados();
    this.cargarCategorias();
  }

  cargarBanners() {
    this.bannerService.obtenerActivos().subscribe({
      next: (data) => {
        this.banners = data;
      },
      error: (error) => {
        console.error('Error al cargar banners:', error);
      }
    });
  }

  cargarProductosDestacados() {
    this.productoService.obtenerDestacados().subscribe({
      next: (data) => {
        this.productosDestacados = data.slice(0, 8); // Solo 8 productos
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos destacados:', error);
        this.loading = false;
      }
    });
  }

  cargarCategorias() {
    this.categoriaService.obtenerActivas().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  getPrecioFinal(producto: Producto): number {
    return producto.precioDescuento && producto.precioDescuento > 0 
      ? producto.precioDescuento 
      : producto.precioUnitario;
  }

  getDescuentoPorcentaje(producto: Producto): number {
    if (producto.precioDescuento && producto.precioDescuento > 0) {
      const descuento = producto.precioUnitario - producto.precioDescuento;
      return Math.round((descuento / producto.precioUnitario) * 100);
    }
    return 0;
  }
}