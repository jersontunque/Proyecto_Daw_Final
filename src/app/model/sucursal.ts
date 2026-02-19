export interface Sucursal {
    idSucursal: number;
    nombreSucursal: string;
    direccion: string;
    distrito: string;
    telefono: string;
    email: string;
    horarioAtencion: string;
    latitud?: number;
    longitud?: number;
    imagenUrl?: string; 
}