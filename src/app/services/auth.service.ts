import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private userId: number | null = null; // Variable temporal para el ID del usuario

  constructor(private http: HttpClient) { }

  // Login: Envía credenciales y recibe respuesta del backend
  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials,{
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Guarda el ID del usuario
  setUserId(id: number) {
    this.userId = id;
  }

  // Obtiene el ID del usuario
  getUserId(): number | null {
    return this.userId;
  }

  // Obtiene el perfil del usuario desde el backend usando su ID
  getProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }
  register(credentials: {
    nombres: string;
    correo: string;
    dni: string;
    contrasena: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // Cierra sesión (limpia el ID del usuario)
  logout() {
    this.userId = null;
  }
}
