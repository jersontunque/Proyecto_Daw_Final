import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita, CrearCitaRequest } from '../model/cita';
import { Sucursal } from '../model/sucursal';
import { TipoServicio } from '../model/tipo-servicio';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // =========================
  //        SUCURSALES
  // =========================
  obtenerSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(
      `${this.baseUrl}/sucursales`
    );
  }

  // =========================
  //      TIPOS SERVICIO
  // =========================
  obtenerTiposServicio(): Observable<TipoServicio[]> {
    return this.http.get<TipoServicio[]>(
      `${this.baseUrl}/tipos-servicio`
    );
  }

  // =========================
  //           CITAS
  // =========================
  crearCita(request: CrearCitaRequest): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/citas`,
      request
    );
  }

  obtenerMisCitas(idUsuario: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(
      `${this.baseUrl}/citas/usuario/${idUsuario}`
    );
  }

  obtenerHorariosDisponibles(
    idSucursal: number,
    fecha: string
  ): Observable<string[]> {

    const params = new HttpParams()
      .set('idSucursal', idSucursal.toString())
      .set('fecha', fecha);

    return this.http.get<string[]>(
      `${this.baseUrl}/citas/horarios-disponibles`,
      { params }
    );
  }

  cancelarCita(
    idCita: number,
    idUsuario: number
  ): Observable<any> {

    return this.http.patch(
      `${this.baseUrl}/citas/${idCita}/cancelar?idUsuario=${idUsuario}`,
      {}
    );
  }
}
