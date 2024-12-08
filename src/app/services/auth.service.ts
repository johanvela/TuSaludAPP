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

  constructor(private http: HttpClient) {}

  // Método para realizar el login
  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
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
  
}
