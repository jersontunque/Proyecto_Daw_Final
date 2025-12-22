import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) { }

  /**
   * Obtener todas las categorías activas
   */
  obtenerActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activas`);
  }

  /**
   * Obtener categorías con productos
   */
  obtenerConProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/con-productos`);
  }

  /**
   * Obtener categoría por ID
   */
  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}