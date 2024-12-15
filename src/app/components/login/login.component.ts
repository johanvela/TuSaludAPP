import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/credentials.model';
import { LoginResponse } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: Credentials = { correo: '', contrasena: '' };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    console.log('Enviando credenciales:', this.credentials);
  
    this.authService.login(this.credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login exitoso:', response);
  
        // Guarda el ID del usuario en el AuthService (memoria)
        this.authService.setUserId(response.usuario.id);
  
        // Navega al HomeComponent
        alert(`Bienvenido, ${response.usuario.nombres}`);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        alert('Nombre de usuario o contraseña incorrecta');
      },
    });
  }  

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
