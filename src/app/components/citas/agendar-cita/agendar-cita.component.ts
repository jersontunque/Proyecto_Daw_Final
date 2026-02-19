import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CitaService } from '../../../services/cita.service';
import { Sucursal } from '../../../model/sucursal';
import { TipoServicio } from '../../../model/tipo-servicio';
import { CrearCitaRequest } from '../../../model/cita';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {
  citaForm: FormGroup;
  sucursales: Sucursal[] = [];
  servicios: TipoServicio[] = [];
  horariosDisponibles: string[] = [];
  loadingHorarios = false;
  minDate: string = '';


  userId: number = 1; 

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private router: Router
  ) {
    this.citaForm = this.fb.group({
      sucursal: ['', Validators.required],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      notas: ['']
    });


    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    

    this.citaForm.get('fecha')?.valueChanges.subscribe(() => this.buscarHorarios());
    this.citaForm.get('sucursal')?.valueChanges.subscribe(() => this.buscarHorarios());
  }

  cargarDatosIniciales() {
    this.citaService.obtenerSucursales().subscribe(data => this.sucursales = data);
    this.citaService.obtenerTiposServicio().subscribe(data => this.servicios = data);
  }

  buscarHorarios() {
    const sucursalId = this.citaForm.get('sucursal')?.value;
    const fecha = this.citaForm.get('fecha')?.value;

    if (sucursalId && fecha) {
      this.loadingHorarios = true;
      this.citaForm.get('hora')?.disable();
      
      this.citaService.obtenerHorariosDisponibles(sucursalId, fecha).subscribe({
        next: (horarios) => {
          this.horariosDisponibles = horarios;
          this.loadingHorarios = false;
          this.citaForm.get('hora')?.enable();
        },
        error: () => {
          this.loadingHorarios = false;
          this.horariosDisponibles = [];
        }
      });
    }
  }

  onSubmit() {
    if (this.citaForm.valid) {
      const formValue = this.citaForm.value;
      
      const request: CrearCitaRequest = {
        idUsuario: this.userId, 
        idSucursal: formValue.sucursal,
        idTipoServicio: formValue.servicio,
        fechaCita: formValue.fecha,
        horaCita: formValue.hora,
        notas: formValue.notas
      };

      this.citaService.crearCita(request).subscribe({
        next: (resp) => {
          alert('¡Cita agendada con éxito! ' + resp.message);
          this.router.navigate(['/mis-citas']);
        },
        error: (err) => {
          alert('Error al agendar: ' + (err.error?.message || 'Intente nuevamente'));
        }
      });
    }
  }
}