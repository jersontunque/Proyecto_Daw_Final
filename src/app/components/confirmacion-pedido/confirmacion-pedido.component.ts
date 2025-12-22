import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { ResumenPedido } from '../../model/pedido';

@Component({
  selector: 'app-confirmacion-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmacion-pedido.component.html',
  styleUrl: './confirmacion-pedido.component.css'
})
export class ConfirmacionPedidoComponent implements OnInit {
  pedido: ResumenPedido | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
    const numeroPedido = this.route.snapshot.params['numeroPedido'];
    this.cargarPedido(numeroPedido);
  }

  cargarPedido(numeroPedido: string) {
    this.pedidoService.obtenerPorNumero(numeroPedido).subscribe({
      next: (data) => {
        this.pedido = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar pedido:', err);
        this.loading = false;
      }
    });
  }

  imprimirPedido() {
    window.print();
  }
}