import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:8080/api/marcas';

  constructor(private http: HttpClient) { }


  obtenerActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activas`);
  }


  obtenerConProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/con-productos`);
  }


  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}