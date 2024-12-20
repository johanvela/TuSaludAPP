import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Datos del usuario

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('Obteniendo ID del usuario:', userId);

    if (!userId) {
      alert('No se pudo obtener la sesión. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
      return;
    }

    // Llamar al servicio para obtener el perfil
    this.authService.getProfile(userId).subscribe({
      next: (response) => {
        console.log('Datos del perfil recibidos:', response);
        this.user = response.usuario; // Acceder específicamente a "usuario"
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        alert('No se pudo cargar el perfil. Inicia sesión nuevamente.');
        this.router.navigate(['/login']);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  navigateToHome() :void {
    this.router.navigate(['/home']);
  }
  navigateToDeleteAccount() {
    this.router.navigate(['/delete-account']);
  }
}
