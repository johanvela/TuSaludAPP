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

  onSubmit(): void {
    if (!this.credentials.nombres || this.credentials.nombres.length < 4) {
      alert('El nombre debe tener al menos 4 letras.');
      return;
    }
  
    if (!this.credentials.correo || !/^\S+@\S+\.\S+$/.test(this.credentials.correo)) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }
  
    if (!this.credentials.dni || !/^\d{8}$/.test(this.credentials.dni)) {
      alert('El DNI debe tener exactamente 8 dígitos.');
      return;
    }
  
    if (
      !this.credentials.contrasena ||
      !/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(this.credentials.contrasena)
    ) {
      alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      return;
    }
  
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
  navigateToLogin() :void {
    this.router.navigate(['/login']);
  }
}
