import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:8080/api/marcas';

  constructor(private http: HttpClient) { }

  /**
   * Obtener todas las marcas activas
   */
  obtenerActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activas`);
  }

  /**
   * Obtener marcas con productos
   */
  obtenerConProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/con-productos`);
  }

  /**
   * Obtener marca por ID
   */
  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}