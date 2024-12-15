import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('No se encontró el ID del usuario');
      this.router.navigate(['/login']);
    } else {
      console.log('Usuario autenticado, ID:', userId);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  // Método para navegar al perfil
  navigateToProfile() {
    console.log('Navegando a /profile...');
    this.router.navigate(['/profile']);
  }
}
