export interface RegistroRequest {
  tipoDocumento: string;
  documentoIdentidad: string;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  telefono: string;
  fechaNacimiento: string; // Formato YYYY-MM-DD
}
