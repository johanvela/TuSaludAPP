import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  bmi: number = 0;
  bmiCategory: string = '';
  exerciseRoutines: any[] = [];
  

  constructor(private authService: AuthService, private router: Router) {}

  currentView = 'exercise';
  userName: string = '';
  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Usuario no autenticado. Inicia sesión nuevamente.');
      this.router.navigate(['/login']);
      return;
    }

    // Obtener el BMI del usuario
    this.authService.getBMI(userId).subscribe({
      next: (response) => {
        if (response.bmiDetails) {
          this.bmi = response.bmiDetails.bmi;
          this.setBMICategory(); // Determinar categoría del IMC
          this.fetchExerciseRoutines(); // Cargar rutinas de ejercicio
        }
      },
      error: (err) => {
        console.error('Error al obtener el BMI:', err);
        alert('No se pudo obtener el BMI. Intente más tarde.');
      },
    });
  }

  fetchExerciseRoutines(): void {
    if (!this.bmiCategory) {
      console.error('Categoría de IMC no definida.');
      return;
    }
    
    this.authService.getExerciseRoutines(this.bmiCategory).subscribe({
      next: (response) => {
        this.exerciseRoutines = response.routines; // Almacenar rutinas
      },
      error: (err) => {
        console.error('Error al obtener las rutinas de ejercicio:', err);
        alert('No se pudieron cargar las rutinas de ejercicio.');
        this.exerciseRoutines = []; // Limpiar rutinas si ocurre un error
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

  exportToPDF(): void {
    const doc = new jsPDF();
  
    // Ruta de la imagen
    const imgPath = 'assets/img/health-logo.png';
  
    // Coordenadas y dimensiones de la imagen
    const imgX = 140; // Ajustar posición X para que coincida con el cuadro rojo
    const imgY = 20;  // Ajustar posición Y para que coincida con el cuadro rojo
    const imgWidth = 60; // Ancho de la imagen
    const imgHeight = 40; // Alto de la imagen
  
    // Cargar la imagen antes de agregarla
    const img = new Image();
    img.src = imgPath;
  
    img.onload = () => {
      // Agregar la imagen al PDF
      doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
  
      // Agregar contenido del PDF (título, texto, tabla)
      doc.setFontSize(14);
      doc.text('Rutinas de Ejercicio', 10, 10);
      doc.text(`Usuario: ${this.userName}`, 10, 20);
      doc.text(`IMC: ${this.bmi.toFixed(2)} (${this.bmiCategory})`, 10, 30);
  
      // Agregar la tabla
      autoTable(doc, {
        head: [['Ejercicio', 'Duración', 'Frecuencia']],
        body: this.exerciseRoutines.map(routine => [
          routine.ejercicio,
          routine.duracion,
          routine.frecuencia,
        ]),
        startY: 50, // Posición donde comienza la tabla
        styles: {
          halign: 'center', // Centrar texto
        },
        headStyles: {
          fillColor: [41, 128, 185], // Color de fondo del encabezado
          textColor: [255, 255, 255], // Color del texto del encabezado
        },
      });
  
      // Descargar el PDF
      doc.save('rutinas-de-ejercicio.pdf');
    };
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

  navigateToProfile(): void {
    console.log('Navegando a /profile...');
    this.router.navigate(['/profile']);
  }

  
  logout(): void {
    console.log('Cerrando sesión...');
    sessionStorage.clear(); // Limpia los datos de la sesión.
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión.
  }
}
