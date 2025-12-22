export interface Carrito {
  idCarrito: number;
  idUsuario: number;
  estado: string;
  detalles: DetalleCarrito[];
  totalItems: number;
  totalGeneral: number;
}

export interface DetalleCarrito {
  idDetalle: number;
  idProducto: number;
  nombreProducto: string;
  imagenPrincipal?: string;
  nombreMarca: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  stockDisponible: number;
}

export interface AgregarAlCarritoRequest {
  idUsuario: number;
  idProducto: number;
  cantidad: number;
}