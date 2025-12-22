export interface CrearPedidoRequest {
  idUsuario: number;
  tipoEntrega: string;
  idDireccionEnvio?: number;
  idSucursalRecojo?: number;
  idMetodoPago: number;
  notas?: string;
}

export interface ResumenPedido {
  idPedido: number;
  numeroPedido: string;
  estadoPedido: string;
  estadoPago: string;
  subtotal: number;
  costoEnvio: number;
  descuento: number;
  total: number;
  fechaPedido: string;
  tipoEntrega: string;
  productos: ProductoPedido[];
  direccionEnvio?: DireccionEnvio;
  metodoPago: MetodoPago;
}

export interface ProductoPedido {
  idProducto: number;
  nombreProducto: string;
  nombreMarca: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  imagenPrincipal?: string;
}

export interface DireccionEnvio {
  idDireccion?: number;
  idUsuario?: number;
  nombreDestinatario: string;
  telefonoDestinatario: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccionLinea1: string;
  direccionLinea2?: string;
  referencia?: string;
  esPrincipal?: boolean;
}

export interface MetodoPago {
  idMetodoPago: number;
  nombreMetodo: string;
  descripcion?: string;
  iconoUrl?: string;
}