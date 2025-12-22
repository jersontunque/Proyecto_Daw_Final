import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DireccionEnvio } from '../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = 'http://localhost:8080/api/direcciones';

  constructor(private http: HttpClient) {}

  obtenerPorUsuario(idUsuario: number): Observable<DireccionEnvio[]> {
    return this.http.get<DireccionEnvio[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  obtenerPrincipal(idUsuario: number): Observable<DireccionEnvio> {
    return this.http.get<DireccionEnvio>(`${this.apiUrl}/usuario/${idUsuario}/principal`);
  }

  crear(direccion: DireccionEnvio): Observable<any> {
    return this.http.post(this.apiUrl, direccion);
  }

  actualizar(id: number, direccion: DireccionEnvio): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, direccion);
  }

  eliminar(id: number, idUsuario: number): Observable<any> {
    const params = new HttpParams().set('idUsuario', idUsuario.toString());
    return this.http.delete(`${this.apiUrl}/${id}`, { params });
  }
}