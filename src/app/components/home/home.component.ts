import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;

  // Datos estáticos para el usuario
  userData = {
    talla: 180, // en cm
    peso: 80, // en kg
    sexo: 'Masculino',
    edad: 40,
  };

  // Cálculo estático del IMC
  bmi: number = 0;
  bmiCategory: string = '';
  recommendation: string = '';
  weightGoal: string = '';
  planNutricional: any[] = [];

  // Datos estáticos para gráficos
  bmiData = [
    { name: 'Bajo Peso', value: 10 },
    { name: 'Normal', value: 60 },
    { name: 'Sobrepeso', value: 20 },
    { name: 'Obesidad', value: 10 },
  ];

  // Colores personalizados para gráficos
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('No se encontró el ID del usuario');
      this.router.navigate(['/login']);
    } else {
      console.log('Usuario autenticado, ID:', userId);
    }
    // Cálculo del IMC
    this.calculateBMI();
    // Ejecuta el metodo del plan nutricional
    this.fetchNutritionPlan();
  }

  calculateBMI(): void {
    const alturaEnMetros = this.userData.talla / 100;
    this.bmi = parseFloat((this.userData.peso / (alturaEnMetros ** 2)).toFixed(2));

    // Categoría basada en el IMC
    if (this.bmi < 18.5) {
      this.bmiCategory = 'Bajo Peso';
      this.recommendation = 'Es importante ganar peso. Considere una dieta rica en proteínas y carbohidratos saludables, acompañada de ejercicios de fuerza para aumentar masa muscular.';
      this.weightGoal = 'Usted debe ganar peso para alcanzar un rango saludable.';
    } else if (this.bmi < 24.9) {
      this.bmiCategory = 'Normal';
      this.recommendation = 'Manténgase en forma con una dieta equilibrada y ejercicios regulares como caminatas, yoga o entrenamiento moderado.';
      this.weightGoal = 'Usted se encuentra en un rango saludable. Mantenga su estilo de vida actual.';
    } else if (this.bmi < 29.9) {
      this.bmiCategory = 'Sobrepeso';
      this.recommendation = 'Se recomienda bajar de peso. Considere reducir el consumo de calorías, optar por alimentos ricos en fibra y realizar ejercicios aeróbicos como correr o nadar.';
      this.weightGoal = 'Usted debe bajar de peso para alcanzar un rango saludable.';
    } else {
      this.bmiCategory = 'Obesidad';
      this.recommendation = 'Es fundamental trabajar para reducir peso. Consulte a un profesional de salud para una dieta adecuada y realice ejercicios de bajo impacto como caminar o ciclismo estacionario.';
      this.weightGoal = 'Usted debe bajar de peso para reducir riesgos a su salud.';
    }
  }

  fetchNutritionPlan(): void {
    this.authService.getNutritionPlan(this.bmi).subscribe(
      (response: any) => {
        this.planNutricional = response.plan;
      },
      (error) => {
        console.error('Error al obtener el plan nutricional:', error);
      }
    );
  }

  navigateToProfile() {
    console.log('Navegando a /profile...');
    this.router.navigate(['/profile']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}