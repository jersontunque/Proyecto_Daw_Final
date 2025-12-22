import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Carrito, AgregarAlCarritoRequest } from '../model/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8080/api/carrito';
  private carritoSubject = new BehaviorSubject<Carrito | null>(null);
  public carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerCarrito(idUsuario: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/${idUsuario}`).pipe(
      tap(carrito => this.carritoSubject.next(carrito))
    );
  }

  agregarProducto(request: AgregarAlCarritoRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, request).pipe(
      tap(() => this.obtenerCarrito(request.idUsuario).subscribe())
    );
  }

  actualizarCantidad(idDetalle: number, idUsuario: number, cantidad: number): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario.toString())
      .set('cantidad', cantidad.toString());
    
    return this.http.put(`${this.apiUrl}/actualizar/${idDetalle}`, null, { params }).pipe(
      tap(() => this.obtenerCarrito(idUsuario).subscribe())
    );
  }

  eliminarProducto(idDetalle: number, idUsuario: number): Observable<any> {
    const params = new HttpParams().set('idUsuario', idUsuario.toString());
    return this.http.delete(`${this.apiUrl}/eliminar/${idDetalle}`, { params }).pipe(
      tap(() => this.obtenerCarrito(idUsuario).subscribe())
    );
  }

  vaciarCarrito(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vaciar/${idUsuario}`).pipe(
      tap(() => this.carritoSubject.next(null))
    );
  }

  getTotalItems(): number {
    const carrito = this.carritoSubject.value;
    return carrito?.totalItems || 0;
  }
}