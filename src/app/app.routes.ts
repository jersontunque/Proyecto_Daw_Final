import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EditarClienteComponent } from './pages/cliente/editar_cliente/editar-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { MisCitasComponent } from './components/citas/mis-citas/mis-citas.component';
import { AgendarCitaComponent } from './components/citas/agendar-cita/agendar-cita.component';




export const routes: Routes = [
  // Rutas clásicas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: ClienteComponent },
  { path: 'perfil/editar', component: EditarClienteComponent },

  // Rutas con carga perezosa
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./components/catalogo/catalogo.component').then(m => m.CatalogoComponent)
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
      import('./components/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent)
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./components/carrito/carrito.component').then(m => m.CarritoComponent)
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'confirmacion/:numeroPedido',
    loadComponent: () =>
      import('./components/confirmacion-pedido/confirmacion-pedido.component').then(m => m.ConfirmacionPedidoComponent)
  },
  
  {
    path: 'sucursales',
    loadComponent: () =>
      import('./components/sucursales/sucursales.component').then(m => m.SucursalesComponent)
  },
  { path: 'sucursales', component: SucursalesComponent },
  { path: 'mis-citas', component: MisCitasComponent },
  { path: 'citas/nueva', component: AgendarCitaComponent },
  // Ruta comodín
  { path: '**', redirectTo: 'home' }
];
