import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('No se pudo obtener la sesión. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getProfile(userId).subscribe({
      next: (response) => {
        this.user = response.usuario;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        alert('No se pudo cargar el perfil.');
        this.router.navigate(['/profile']);
      },
    });
  }

  onUpdateProfile(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
        alert('No se pudo obtener la sesión. Inicia sesión nuevamente.');
        this.router.navigate(['/login']);
        return;
    }

    // Agregar usuario_id al objeto que se enviará
    this.user.usuario_id = userId;

    this.authService.updateProfile(this.user).subscribe({
        next: () => {
            alert('Perfil actualizado con éxito.');
            this.router.navigate(['/profile']);
        },
        error: (err) => {
            console.error('Error al actualizar el perfil:', err);
            alert('Hubo un problema al actualizar el perfil.');
        },
    });
}


  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
