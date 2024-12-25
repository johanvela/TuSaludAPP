import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
})
export class DeleteAccountComponent {
  reason: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  onDeleteAccount(): void {
    if (!this.reason || !this.password || !this.confirmPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden. Inténtalo nuevamente.');
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      alert('No se pudo validar tu sesión. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
      return;
    }

    // Llamada al servicio para eliminar la cuenta
    this.authService.deleteAccount(userId, this.password).subscribe({
      next: () => {
        alert('Tu cuenta ha sido eliminada con éxito.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al eliminar la cuenta:', err);
        alert('No se pudo eliminar tu cuenta. Verifica tu contraseña.');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
