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
export class FeedingComponent implements OnInit{
  planNutricional: any[] = [];
  bmi: number = 0;
  
  
  
  constructor(private sharedService: SharedService, private authService: AuthService, private router: Router) {}

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
  ngOnInit(): void {
    // Escuchar el BMI desde el servicio compartido
    this.sharedService.currentBmi.subscribe((bmiValue) => {
      this.bmi = bmiValue;
      console.log('BMI recibido en FeedingComponent:', this.bmi);
      

      // Obtener el plan nutricional según el BMI
      this.fetchNutritionPlan();
    });
  }
    navigateToProfile(): void {
      console.log('Navegando a /profile...');
      this.router.navigate(['/profile']);
    }

    navigateToHome(){
      this.router.navigate(['/home'])
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

