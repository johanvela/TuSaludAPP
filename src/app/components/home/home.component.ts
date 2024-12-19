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

  // Datos estáticos para gráficos
  bmiData = [
    { name: 'Bajo Peso', value: 10 },
    { name: 'Normal', value: 60 },
    { name: 'Sobrepeso', value: 20 },
    { name: 'Obesidad', value: 10 },
  ];

  weeklyNutrition = [
    { name: 'Proteínas', value: 40 },
    { name: 'Carbohidratos', value: 30 },
    { name: 'Grasas', value: 20 },
    { name: 'Vitaminas', value: 10 },
  ];

  // Ajustar colorScheme al tipo Color
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, // Cambiado a 'ScaleType.Ordinal'
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

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

  navigateToProfile() {
    console.log('Navegando a /profile...');
    this.router.navigate(['/profile']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}