import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private bmiSource = new BehaviorSubject<number>(0); // Inicializa con 0
  currentBmi = this.bmiSource.asObservable();

  setBmi(value: number): void {
    this.bmiSource.next(value); // Actualiza el valor del BMI
  }
}
