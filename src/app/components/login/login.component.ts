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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Enviando credenciales:', this.credentials);

    // Llamar al servicio de login
    this.authService.login(this.credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login exitoso:', response);

        // Verificación de la respuesta
        if (response.usuario && response.usuario.id) {
          // Guarda el ID del usuario en memoria
          this.authService.setUserId(response.usuario.id);

          // Recupera el perfil del usuario
          const userId = this.authService.getUserId();
          this.authService.getProfile(userId!).subscribe({
            next: (profile) => {
              console.log('Perfil del usuario:', profile);
              alert(`Bienvenido, ${profile.usuario.nombres}`);
              // Redirige al HomeComponent
              this.router.navigate(['/home']);
            },
            error: (err) => {
              console.error('Error al recuperar perfil:', err);
              alert('Ocurrió un error al cargar el perfil.');
            },
          });
        } else {
          console.error('Error: La respuesta del servidor no contiene el usuario o el ID.');
          alert('Error en la respuesta del servidor.');
        }
      },
      error: (err) => {
        console.error('Error en el login:', err);
        alert('Nombre de usuario o contraseña incorrecta.');
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
