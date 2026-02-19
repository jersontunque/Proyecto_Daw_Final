import { Sucursal } from "./sucursal";
import { TipoServicio } from "./tipo-servicio";

export interface Cita {
  idCita: number;
  numeroCita: string;
  sucursal: Sucursal;
  tipoServicio: TipoServicio;
  fechaCita: string; 
  horaCita: string;  
  estadoCita: 'PROGRAMADA' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA' | 'NO_ASISTIO';
  notas: string;
}

export interface CrearCitaRequest {
  idUsuario: number;
  idSucursal: number;
  idTipoServicio: number;
  fechaCita: string;
  horaCita: string;
  notas?: string;
}
