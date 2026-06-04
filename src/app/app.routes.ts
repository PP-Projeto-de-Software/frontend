import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';

import { ClientesComponent } from './pages/clientes/clientes';

import { VeiculosComponent } from './pages/veiculos/veiculos';

import { OrdemServicoComponent } from './pages/ordem-servico/ordem-servico';

import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'clientes',
    component: ClientesComponent
  },

  {
    path: 'veiculos',
    component: VeiculosComponent
  },

  {
    path: 'ordens-servico',
    component: OrdemServicoComponent
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard')
        .then(m => m.DashboardComponent)
  }
];