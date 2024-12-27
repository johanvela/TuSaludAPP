import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
})
export class BMIComponent implements OnInit {
  userData: any = {};
  bmi: number = 0;
  bmiCategory: string = '';
  recommendation: string = '';
  weightGoal: string = '';

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) {}

  currentView = 'bmi';

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Usuario no autenticado. Por favor, inicia sesión.');
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getBMI(userId).subscribe({
      next: (response) => {
        console.log('Datos del backend:', response); // Verifica los datos
        if (response && response.bmiDetails) {
          this.userData = response.bmiDetails; // Datos del usuario
          this.bmi = this.userData.bmi; // IMC calculado en el backend
          this.setBMICategory(); // Define la categoría y recomendaciones
        } else {
          alert('No se pudieron cargar los datos dinámicos.');
          this.router.navigate(['/profile']);
        }
      },
      error: (err) => {
        console.error('Error al obtener los datos del BMI:', err);
        alert('Hubo un problema al cargar la información. Por favor, intente más tarde.');
        this.router.navigate(['/profile']);
      },
    });
  }

  setBMICategory(): void {
    if (this.bmi < 18.5) {
      this.bmiCategory = 'Bajo Peso';
      this.recommendation = 'Es importante ganar peso.';
      this.weightGoal = 'Debe ganar peso.';
    } else if (this.bmi < 24.9) {
      this.bmiCategory = 'Normal';
      this.recommendation = 'Manténgase en forma.';
      this.weightGoal = 'Está en un rango saludable.';
    } else if (this.bmi < 29.9) {
      this.bmiCategory = 'Sobrepeso';
      this.recommendation = 'Reduzca calorías.';
      this.weightGoal = 'Debe bajar de peso.';
    } else {
      this.bmiCategory = 'Obesidad';
      this.recommendation = 'Trabaje para reducir peso.';
      this.weightGoal = 'Debe bajar de peso.';
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

  navigateToHome(): void {
    console.log('Navegando a /home...');
    this.router.navigate(['/home']);
  }

  navigateToFeeding(): void {
    console.log('Navegando a /feeding...');
    this.router.navigate(['/feeding']);
  }

  navigateToBmi(): void {
    console.log('Navegando a /bmi...');
    this.router.navigate(['/bmi']);
  }

  navigateToExercise(): void {
    this.router.navigate(['/exercise']);
  }
  

  logout(): void {
    console.log('Cerrando sesión...');
    sessionStorage.clear(); // Limpia los datos de la sesión
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
