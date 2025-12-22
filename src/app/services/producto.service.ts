import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, ProductoDetalle, PaginatedResponse } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  /**
   * Obtener todos los productos con paginación
   */
  obtenerTodos(page: number = 0, size: number = 12, sortBy: string = 'fechaCreacion', sortDir: string = 'desc'): Observable<PaginatedResponse<Producto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<PaginatedResponse<Producto>>(this.apiUrl, { params });
  }

  /**
   * Buscar productos por nombre
   */
  buscarPorNombre(nombre: string, page: number = 0, size: number = 12): Observable<PaginatedResponse<Producto>> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * Filtrar por categoría
   */
  filtrarPorCategoria(idCategoria: number, page: number = 0, size: number = 12): Observable<PaginatedResponse<Producto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/filtrar/categoria/${idCategoria}`, { params });
  }

  /**
   * Filtrar por marca
   */
  filtrarPorMarca(idMarca: number, page: number = 0, size: number = 12): Observable<PaginatedResponse<Producto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/filtrar/marca/${idMarca}`, { params });
  }

  /**
   * Filtrar por precio
   */
  filtrarPorPrecio(precioMin: number, precioMax: number, page: number = 0, size: number = 12): Observable<PaginatedResponse<Producto>> {
    const params = new HttpParams()
      .set('precioMin', precioMin.toString())
      .set('precioMax', precioMax.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/filtrar/precio`, { params });
  }

  /**
   * Búsqueda avanzada con múltiples filtros
   */
  busquedaAvanzada(filtros: any, page: number = 0, size: number = 12, sortBy: string = 'fechaCreacion', sortDir: string = 'desc'): Observable<PaginatedResponse<Producto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    // Agregar filtros opcionales
    if (filtros.nombre) params = params.set('nombre', filtros.nombre);
    if (filtros.idCategoria) params = params.set('idCategoria', filtros.idCategoria.toString());
    if (filtros.idMarca) params = params.set('idMarca', filtros.idMarca.toString());
    if (filtros.precioMin) params = params.set('precioMin', filtros.precioMin.toString());
    if (filtros.precioMax) params = params.set('precioMax', filtros.precioMax.toString());
    if (filtros.color) params = params.set('color', filtros.color);
    if (filtros.forma) params = params.set('forma', filtros.forma);
    if (filtros.genero) params = params.set('genero', filtros.genero);

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/busqueda-avanzada`, { params });
  }

  /**
   * Obtener productos destacados
   */
  obtenerDestacados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/destacados`);
  }

  /**
   * Obtener productos nuevos
   */
  obtenerNuevos(page: number = 0, size: number = 12): Observable<PaginatedResponse<Producto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/nuevos`, { params });
  }

  /**
   * Obtener productos en promoción
   */
  obtenerPromociones(page: number = 0, size: number = 12): Observable<PaginatedResponse<Producto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/promociones`, { params });
  }

  /**
   * Obtener detalle de producto por ID
   */
  obtenerPorId(id: number): Observable<ProductoDetalle> {
    return this.http.get<ProductoDetalle>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener productos relacionados
   */
  obtenerRelacionados(id: number, limit: number = 4): Observable<Producto[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<Producto[]>(`${this.apiUrl}/${id}/relacionados`, { params });
  }

  /**
   * Obtener filtros disponibles (colores, formas)
   */
  obtenerFiltrosDisponibles(): Observable<{ colores: string[], formas: string[] }> {
    return this.http.get<{ colores: string[], formas: string[] }>(`${this.apiUrl}/filtros/disponibles`);
  }
}