import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor() {}

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  eliminarToken() {
    localStorage.removeItem('token');
  }

  private decodificarToken(): any | null {
    const token = this.obtenerToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  obtenerIdUsuarioDelToken(): number | null {
    const decoded = this.decodificarToken();
    return decoded?.idUsuario ?? null;
  }

  obtenerRolUsuario(): string | null {
    const decoded = this.decodificarToken();
    return decoded?.rol ?? null;
  }
}
