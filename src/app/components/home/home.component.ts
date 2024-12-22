import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToProfile(): void {
    console.log('Navegando a /profile...');
    this.router.navigate(['/profile']);
  }

  navigateToFeeding(){
    this.router.navigate(['/feeding'])
  }

  navigateToBmi(){
    this.router.navigate(['/bmi'])
  }
  
  logout(): void {
    console.log('Cerrando sesión...');
    sessionStorage.clear(); // Limpia los datos de la sesión.
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión.
  }
}
