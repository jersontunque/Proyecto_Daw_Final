import { Injectable } from '@angular/core';

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
}
