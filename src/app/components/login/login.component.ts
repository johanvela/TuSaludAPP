import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/credentials.model';
import { LoginResponse } from '../../models/user.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  credentials: Credentials = { correo: '', contrasena: '' };
  userResponse!: LoginResponse; // Almacena la respuesta del backend

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Enviando credenciales:', this.credentials);

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.userResponse = response; // Almacena el response
        console.log('Login exitoso:', this.userResponse);
        alert(`Bienvenido, ${this.userResponse.usuario.nombres}`);
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      },
      error: (err) => {
        console.error('Error en el login:', err);
        alert('Nombre de usuario o contraseña incorrecta');
      },
      complete: () => {
        console.log('Proceso de login completo');
      },
    });
  }

  navigateToRegister() {
    console.log('Navegando a /register...');
    this.router.navigate(['/register']);
  }
}