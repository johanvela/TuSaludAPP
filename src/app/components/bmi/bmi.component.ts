import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
})
export class BMIComponent implements OnInit {
  userData = {
    talla: 180, // en cm
    peso: 80, // en kg
    edad: 40,
  };

  bmi: number = 0;
  bmiCategory: string = '';
  recommendation: string = '';
  weightGoal: string = '';

  constructor(private sharedService: SharedService, private router: Router) {}
  currentView = 'bmi';
  ngOnInit(): void {
    this.calculateBMI();
  }

  calculateBMI(): void {
    const alturaEnMetros = this.userData.talla / 100;
    this.bmi = parseFloat((this.userData.peso / (alturaEnMetros ** 2)).toFixed(2));

      // Guardar el BMI en el servicio compartido
      this.sharedService.setBmi(this.bmi);

    // Categoría basada en el IMC
    if (this.bmi < 18.5) {
      this.bmiCategory = 'Bajo Peso';
      this.recommendation =
        'Es importante ganar peso. Considere una dieta rica en proteínas y carbohidratos saludables.';
      this.weightGoal = 'Usted debe ganar peso para alcanzar un rango saludable.';
    } else if (this.bmi < 24.9) {
      this.bmiCategory = 'Normal';
      this.recommendation =
        'Manténgase en forma con una dieta equilibrada y ejercicios regulares.';
      this.weightGoal = 'Usted se encuentra en un rango saludable.';
    } else if (this.bmi < 29.9) {
      this.bmiCategory = 'Sobrepeso';
      this.recommendation =
        'Considere reducir el consumo de calorías y realizar ejercicios aeróbicos.';
      this.weightGoal = 'Usted debe bajar de peso para alcanzar un rango saludable.';
    } else {
      this.bmiCategory = 'Obesidad';
      this.recommendation =
        'Es fundamental trabajar para reducir peso. Consulte a un profesional de salud.';
      this.weightGoal = 'Usted debe bajar de peso para reducir riesgos a su salud.';
    }
  }

  // Cambiar color según el resultado
  getResultColor(): string {
    if (this.bmiCategory === 'Bajo Peso') return '#FFA500'; // Naranja
    if (this.bmiCategory === 'Normal') return '#28A745'; // Verde
    if (this.bmiCategory === 'Sobrepeso') return '#FFC107'; // Amarillo
    if (this.bmiCategory === 'Obesidad') return '#DC3545'; // Rojo
    return '#000'; // Negro por defecto
  }

    navigateToProfile(): void {
      console.log('Navegando a /profile...');
      this.router.navigate(['/profile']);
    }

    navigateToHome(){
      this.router.navigate(['/home'])
    }

    navigateToFeeding(){
      this.router.navigate(['/feeding'])
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
