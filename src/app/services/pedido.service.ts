import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearPedidoRequest, ResumenPedido } from '../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  crearPedido(request: CrearPedidoRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  obtenerPorNumero(numeroPedido: string): Observable<ResumenPedido> {
    return this.http.get<ResumenPedido>(`${this.apiUrl}/numero/${numeroPedido}`);
  }

  obtenerPedidosUsuario(idUsuario: number, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${idUsuario}?page=${page}&size=${size}`);
  }
}