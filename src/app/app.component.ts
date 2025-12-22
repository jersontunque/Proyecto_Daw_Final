import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common'; // <- obligatorio para *ngIf

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet], // <- agregamos CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarNavbarFlag = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Rutas donde no se debe mostrar el navbar
        const rutasSinNavbar = ['/login', '/registro'];
        this.mostrarNavbarFlag = !rutasSinNavbar.includes(event.url);
      });
  }
}
