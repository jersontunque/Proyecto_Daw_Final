import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../model/cita';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-citas.component.html'
})
export class MisCitasComponent implements OnInit {
  citas: Cita[] = [];
  userId: number = 1; // El mismo ID de prueba

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.obtenerMisCitas(this.userId).subscribe(data => {
      this.citas = data;
    });
  }

  cancelar(idCita: number) {
    if(confirm('¿Estás seguro de cancelar esta cita?')) {
      this.citaService.cancelarCita(idCita, this.userId).subscribe({
        next: () => {
          this.cargarCitas(); // Recargar lista
        },
        error: (err) => alert('Error al cancelar: ' + err.error?.message)
      });
    }
  }

  getClassEstado(estado: string): string {
    switch(estado) {
      case 'PROGRAMADA': return 'bg-primary';
      case 'CONFIRMADA': return 'bg-success';
      case 'CANCELADA': return 'bg-danger';
      case 'COMPLETADA': return 'bg-secondary';
      default: return 'bg-dark';
    }
  }
}