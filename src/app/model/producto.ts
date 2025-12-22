export interface Producto {
  idProducto: number;
  nombreProducto: string;
  descripcion: string;
  idCategoria: number;
  nombreCategoria: string;
  idMarca: number;
  nombreMarca: string;
  precioUnitario: number;
  precioDescuento?: number;
  stock: number;
  color?: string;
  forma?: string;
  material?: string;
  genero?: string;
  esDestacado?: boolean;
  esNuevo?: boolean;
  enPromocion?: boolean;
  imagenPrincipal?: string;
}

export interface ProductoDetalle extends Producto {
  imagenes: ImagenProducto[];
}

export interface ImagenProducto {
  idImagen: number;
  urlImagen: string;
  esPrincipal: boolean;
  orden: number;
}

export interface PaginatedResponse<T> {
  productos: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}