import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  currentView = 'home';
  constructor(private router: Router) {}

  navigateToProfile(): void {
    console.log('Navegando a /profile...');
    this.router.navigate(['/profile']);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToFeeding(){
    this.router.navigate(['/feeding'])
  }

  navigateToBmi(){
    this.router.navigate(['/bmi'])
  }
  navigateToUpdateProfile(): void {
    this.router.navigate(['/update-profile']);
  }
  
  navigateToExercise(): void {
    this.router.navigate(['/exercise']);
  }
  
  
  logout(): void {
    console.log('Cerrando sesión...');
    sessionStorage.clear(); // Limpia los datos de la sesión.
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión.
  }
}
