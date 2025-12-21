import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { RegistroRequest } from '../../model/registro.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  tipoDocumento = '';
  documentoIdentidad = '';
  nombres = '';
  apellidos = '';
  email = '';
  password = '';
  telefono = '';
  fechaNacimiento = '';

  constructor(private registroService: RegistroService, private router: Router) {}

  registrar() {
    const request: RegistroRequest = {
      tipoDocumento: this.tipoDocumento,
      documentoIdentidad: this.documentoIdentidad,
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento
    };

    this.registroService.registrarUsuario(request).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
  }
}
