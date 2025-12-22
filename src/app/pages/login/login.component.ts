import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../model/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    const request: LoginRequest = { email: this.email, password: this.password };
    this.loginService.login(request).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => console.error('Error login', err)
    });
  }
}
