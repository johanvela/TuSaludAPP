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
  private userId: number | null = null; // <-- Variable para almacenar temporalmente el ID del usuario

  constructor(private http: HttpClient) { }

  // Login: Envía credenciales y recibe respuesta del backend
  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Guarda el ID del usuario después del login
  setUserId(id: number) { // <-- Guarda temporalmente el ID
    this.userId = id;
  }

  // Obtiene el ID del usuario guardado
  getUserId(): number | null { // <-- Recupera el ID temporal
    return this.userId;
  }

  // Obtiene el perfil del usuario desde el backend
  getProfile(userId: number): Observable<any> { // <-- Usa el ID para llamar a /profile/:id
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }

  // Registro de usuario
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

  // Eliminar Usuario
  deleteAccount(userId: number, password: string): Observable<any> {
    const url = 'http://localhost:3001/delete-account';
    return this.http.post(url, { userId, password }, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

    // Obtener el plan nutricional basado en el IMC del usuario
    getNutritionPlan(bmi: number): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/get-nutrition-plan`, { bmi }, {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  

  // Cierra sesión (limpia el ID del usuario)
  logout() { 
    this.userId = null; // <-- Limpia el ID temporal
  }
}
