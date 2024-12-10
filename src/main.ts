import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login.component';
import { routes } from  './app/app.routes';
import { AppComponent } from './app/app.component';



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()],
}).catch((err) => console.error(err));
