import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../model/sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private apiUrl = 'http://localhost:8080/api/sucursales';

  constructor(private http: HttpClient) {}

  listarSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.apiUrl);
  }
}