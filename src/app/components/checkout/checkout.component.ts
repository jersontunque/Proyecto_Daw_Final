import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import { DireccionService } from '../../services/direccion.service';
import { Carrito } from '../../model/carrito';
import { DireccionEnvio, MetodoPago } from '../../model/pedido';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  carrito: Carrito | null = null;
  direcciones: DireccionEnvio[] = [];
  metodosPago: MetodoPago[] = [];
  
  idUsuario = 1; 
  tipoEntrega: string = 'ENVIO';
  idDireccionSeleccionada: number | null = null;
  idMetodoPagoSeleccionado: number | null = null;
  notas: string = '';
  
  mostrarFormDireccion = false;
  nuevaDireccion: DireccionEnvio = this.inicializarDireccion();
  
  costoEnvio = 10.00;
  procesando = false;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private direccionService: DireccionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCarrito();
    this.cargarDirecciones();
    this.cargarMetodosPago();
  }

  cargarCarrito() {
    this.carritoService.obtenerCarrito(this.idUsuario).subscribe({
      next: (data) => {
        if (!data || data.detalles.length === 0) {
          alert('El carrito está vacío');
          this.router.navigate(['/carrito']);
          return;
        }
        this.carrito = data;
      },
      error: (err) => {
        console.error('Error al cargar carrito:', err);
        this.router.navigate(['/carrito']);
      }
    });
  }

  cargarDirecciones() {
    this.direccionService.obtenerPorUsuario(this.idUsuario).subscribe({
      next: (data) => {
        this.direcciones = data;
        if (data.length > 0) {
          const principal = data.find(d => d.esPrincipal);
          this.idDireccionSeleccionada = principal?.idDireccion ?? data[0].idDireccion ?? null;
        }
      },
      error: (err) => console.error('Error al cargar direcciones:', err)
    });
  }

  cargarMetodosPago() {
    this.metodosPago = [
      { idMetodoPago: 1, nombreMetodo: 'Tarjeta de Crédito/Débito', descripcion: 'Visa, Mastercard, American Express' },
      { idMetodoPago: 2, nombreMetodo: 'Yape', descripcion: 'Pago mediante Yape' },
      { idMetodoPago: 3, nombreMetodo: 'Plin', descripcion: 'Pago mediante Plin' },
      { idMetodoPago: 5, nombreMetodo: 'Pago Contra Entrega', descripcion: 'Pago en efectivo al recibir' }
    ];
    this.idMetodoPagoSeleccionado = 1;
  }

  toggleFormDireccion() {
    this.mostrarFormDireccion = !this.mostrarFormDireccion;
    if (this.mostrarFormDireccion) {
      this.nuevaDireccion = this.inicializarDireccion();
    }
  }

  guardarDireccion() {
    this.nuevaDireccion.idUsuario = this.idUsuario;
    
    this.direccionService.crear(this.nuevaDireccion).subscribe({
      next: (response) => {
        alert('Dirección guardada exitosamente');
        this.cargarDirecciones();
        this.mostrarFormDireccion = false;
        this.idDireccionSeleccionada = response.data.idDireccion;
      },
      error: (err) => alert('Error al guardar dirección: ' + (err.error?.message || 'Error'))
    });
  }

  inicializarDireccion(): DireccionEnvio {
    return {
      nombreDestinatario: '',
      telefonoDestinatario: '',
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: '',
      direccionLinea1: '',
      direccionLinea2: '',
      referencia: '',
      esPrincipal: false
    };
  }

  getTotal(): number {
    if (!this.carrito) return 0;
    const subtotal = this.carrito.totalGeneral;
    const envio = this.tipoEntrega === 'ENVIO' ? this.costoEnvio : 0;
    return subtotal + envio;
  }

  formularioValido(): boolean {
    if (!this.idMetodoPagoSeleccionado) return false;
    if (this.tipoEntrega === 'ENVIO' && !this.idDireccionSeleccionada) return false;
    return true;
  }

  finalizarCompra() {
    if (!this.formularioValido()) return;

    this.procesando = true;

    const request = {
      idUsuario: this.idUsuario,
      tipoEntrega: this.tipoEntrega,
      idDireccionEnvio: this.tipoEntrega === 'ENVIO' ? this.idDireccionSeleccionada ?? undefined : undefined,
      idSucursalRecojo: this.tipoEntrega === 'RECOJO_EN_TIENDA' ? 1 : undefined,
      idMetodoPago: this.idMetodoPagoSeleccionado!,
      notas: this.notas || undefined
    };

    this.pedidoService.crearPedido(request).subscribe({
      next: (response) => {
        this.procesando = false;
        const numeroPedido = response.data.numeroPedido;
        this.router.navigate(['/confirmacion', numeroPedido]);
      },
      error: (err) => {
        alert('Error al procesar el pedido: ' + (err.error?.message || 'Error desconocido'));
        this.procesando = false;
      }
    });
  }

  soloLetras(event: KeyboardEvent): boolean {
  const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
  return pattern.test(event.key);
}

soloNumeros(event: KeyboardEvent): boolean {
  const pattern = /^[0-9]$/;
  return pattern.test(event.key);
}
}