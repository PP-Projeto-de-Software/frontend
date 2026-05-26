import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';

import { ClientesComponent } from './pages/clientes/clientes';

import { VeiculosComponent } from './pages/veiculos/veiculos';

import { OrdemServicoComponent } from './pages/ordem-servico/ordem-servico';


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
  }
];