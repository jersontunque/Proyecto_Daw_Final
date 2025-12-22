import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../services/cita.service';
import { Sucursal } from '../../model/sucursal';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  sucursales: Sucursal[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.obtenerSucursales().subscribe(data => {
      this.sucursales = data;
    });
  }
}