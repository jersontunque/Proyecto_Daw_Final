import { Component, OnInit } from '@angular/core';
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
export class RegistroComponent implements OnInit {

  tipoDocumento = '';
  documentoIdentidad = '';
  nombres = '';
  apellidos = '';
  email = '';
  password = '';
  telefono = '';
  fechaNacimiento = '';


  maxFechaNacimiento: string = '';

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const hoy = new Date();
    const fechaLimite = new Date(
      hoy.getFullYear() - 18,
      hoy.getMonth(),
      hoy.getDate()
    );

    this.maxFechaNacimiento = fechaLimite.toISOString().split('T')[0];
  }

  registrar() {


    const hoy = new Date();
    const nacimiento = new Date(this.fechaNacimiento);

    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
      edad < 18 ||
      (edad === 18 && mes < 0) ||
      (edad === 18 && mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      alert("Debes ser mayor de 18 años para registrarte.");
      return;
    }

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
