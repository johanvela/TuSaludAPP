import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  credentials = {
    nombres: '',
    correo: '',
    dni: '',
    contrasena: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Datos de registro enviados:', this.credentials);

    // Consumir el servicio AuthService para registrar
    this.authService.register(this.credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('Registro exitoso:', response);
        alert(`¡Registro exitoso! Bienvenido, ${response.usuario.nombres}`);
        this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        alert('Ocurrió un error al registrarse. Inténtalo nuevamente.');
      },
    });
  }
  navigateToHome() :void {
    this.router.navigate(['/home']);
  }
}
