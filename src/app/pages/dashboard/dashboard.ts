import { Component, OnInit } from '@angular/core';

import { OrdemServicoService }
from '../../services/ordem-servico.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent
implements OnInit {

  dashboard: any = {};

  constructor(
    private ordemService: OrdemServicoService
  ) {}

  ngOnInit(): void {

    this.carregarDashboard();
  }

  carregarDashboard(): void {

    this.ordemService
      .obterDashboard()
      .subscribe({

        next: (dados) => {

          this.dashboard = dados;
        },

        error: (erro) => {

          console.log(erro);
        }
      });
  }
}