import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component'; 
import { FeedingComponent } from './components/feeding/feeding.component';
import { BMIComponent } from './components/bmi/bmi.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bmi', component: BMIComponent },
  { path: 'feeding', component: FeedingComponent },
  { path: 'profile', component: ProfileComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'delete-account', component: DeleteAccountComponent },
  { path: '**', redirectTo: 'login' }, 
];
