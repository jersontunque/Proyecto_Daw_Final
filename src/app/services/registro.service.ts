import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroRequest } from '../model/registro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:8080/auth/registro';

  constructor(private http: HttpClient) {}

  registrarUsuario(datos: RegistroRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, datos);
  }
}
