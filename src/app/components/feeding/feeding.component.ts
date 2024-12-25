import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feeding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feeding.component.html',
  styleUrls: ['./feeding.component.css'],
})
export class FeedingComponent implements OnInit {
  currentView = 'feeding';
  planNutricional: any[] = [];
  bmi: number = 0;
  bmiCategory: string = '';
  userName: string = '';

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Usuario no autenticado. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
      return;
    }

    // Obtener el perfil del usuario
    this.authService.getProfile(userId).subscribe({
      next: (response) => {
        if (response.usuario) {
          this.userName = response.usuario.nombres; // Obtén el nombre del usuario
          console.log('Nombre del usuario:', this.userName);
        }
      },
      error: (err) => {
        console.error('Error al obtener el perfil del usuario:', err);
      },
    });

    // Obtener el BMI del usuario
    this.authService.getBMI(userId).subscribe({
      next: (response) => {
        if (response.bmiDetails) {
          this.bmi = response.bmiDetails.bmi;
          this.setBMICategory(); // Determinar categoría según el BMI
          this.fetchNutritionPlan(); // Actualiza la tabla de alimentación
        }
      },
      error: (err) => {
        console.error('Error al obtener el BMI:', err);
        alert('No se pudo obtener el BMI. Intente más tarde.');
      },
    });
  }

  fetchNutritionPlan(): void {
    this.authService.getNutritionPlan(this.bmi).subscribe({
      next: (response: any) => {
        this.planNutricional = response.plan;
        console.log('Plan nutricional recibido:', this.planNutricional);
      },
      error: (error) => {
        console.error('Error al obtener el plan nutricional:', error);
      },
    });
  }

  setBMICategory(): void {
    if (this.bmi < 18.5) {
      this.bmiCategory = 'Bajo Peso';
    } else if (this.bmi < 24.9) {
      this.bmiCategory = 'Normal';
    } else if (this.bmi < 29.9) {
      this.bmiCategory = 'Sobrepeso';
    } else {
      this.bmiCategory = 'Obesidad';
    }
  }

  getResultColor(): string {
    switch (this.bmiCategory) {
      case 'Bajo Peso':
        return '#FFA500'; // Naranja
      case 'Normal':
        return '#28A745'; // Verde
      case 'Sobrepeso':
        return '#FFC107'; // Amarillo
      case 'Obesidad':
        return '#DC3545'; // Rojo
      default:
        return '#000'; // Negro por defecto
    }
  }

  navigateToProfile(): void {
    console.log('Navegando a /profile...');
    this.router.navigate(['/profile']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToFeeding(): void {
    this.router.navigate(['/feeding']);
  }

  navigateToBmi(): void {
    this.router.navigate(['/bmi']);
  }

  logout(): void {
    console.log('Cerrando sesión...');
    sessionStorage.clear(); // Limpia los datos de la sesión.
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión.
  }
}

