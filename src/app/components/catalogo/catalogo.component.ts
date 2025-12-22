
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  categorias: any[] = [];
  marcas: any[] = [];
  coloresDisponibles: string[] = [];
  formasDisponibles: string[] = [];
  
  // Filtros
  filtros = {
    nombre: '',
    idCategoria: null as number | null,
    idMarca: null as number | null,
    precioMin: null as number | null,
    precioMax: null as number | null,
    color: '',
    forma: '',
    genero: ''
  };
  
  // Paginación
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pageSize = 12;
  
  // Ordenamiento
  sortBy = 'fechaCreacion';
  sortDir = 'desc';
  
  loading = true;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarMarcas();
    this.cargarFiltrosDisponibles();
    
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.filtros.nombre = params['search'];
      }
      if (params['categoria']) {
        this.filtros.idCategoria = +params['categoria'];
      }
      this.cargarProductos();
    });
  }

  cargarCategorias() {
    this.categoriaService.obtenerActivas().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  cargarMarcas() {
    this.marcaService.obtenerActivas().subscribe({
      next: (data) => this.marcas = data,
      error: (err) => console.error('Error al cargar marcas:', err)
    });
  }

  cargarFiltrosDisponibles() {
    this.productoService.obtenerFiltrosDisponibles().subscribe({
      next: (data) => {
        this.coloresDisponibles = data.colores;
        this.formasDisponibles = data.formas;
      },
      error: (err) => console.error('Error al cargar filtros:', err)
    });
  }

  cargarProductos() {
    this.loading = true;
    this.productoService.busquedaAvanzada(this.filtros, this.currentPage, this.pageSize, this.sortBy, this.sortDir)
      .subscribe({
        next: (data) => {
          this.productos = data.productos;
          this.currentPage = data.currentPage;
          this.totalPages = data.totalPages;
          this.totalItems = data.totalItems;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
          this.loading = false;
        }
      });
  }

  aplicarFiltros() {
    this.currentPage = 0;
    this.cargarProductos();
  }

  limpiarFiltros() {
    this.filtros = {
      nombre: '',
      idCategoria: null,
      idMarca: null,
      precioMin: null,
      precioMax: null,
      color: '',
      forma: '',
      genero: ''
    };
    this.aplicarFiltros();
  }

  cambiarOrden(event: any) {
    const value = event.target.value;
    if (value === 'precio-asc') {
      this.sortBy = 'precioUnitario';
      this.sortDir = 'asc';
    } else if (value === 'precio-desc') {
      this.sortBy = 'precioUnitario';
      this.sortDir = 'desc';
    } else if (value === 'nombre-asc') {
      this.sortBy = 'nombreProducto';
      this.sortDir = 'asc';
    } else {
      this.sortBy = 'fechaCreacion';
      this.sortDir = 'desc';
    }
    this.cargarProductos();
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.cargarProductos();
    window.scrollTo(0, 0);
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

  get paginasArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i);
  }
}