import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from '../model/login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data)
      .pipe(tap(res => this.authService.guardarToken(res.token)));
  }
}
