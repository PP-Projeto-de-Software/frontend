import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrdemServicoService } from '../../services/ordem-servico.service';

export interface DashboardData {
  total_ordens: number;
  pendentes: number;
  em_andamento: number;
  concluidas: number;
  faturamento_total: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  dashboard: DashboardData | null = null;
  carregando = false;
  erro = false;

  // filtros
  dataInicio = '';
  dataFim = '';
  statusFiltro = '';

  constructor(private ordemService: OrdemServicoService) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.carregando = true;
    this.erro = false;

    const inicio = this.dataInicio
      ? new Date(this.dataInicio).toISOString()
      : undefined;

    const fim = this.dataFim
      ? new Date(this.dataFim).toISOString()
      : undefined;

    const statusVal = this.statusFiltro || undefined;

    this.ordemService.obterDashboard(inicio, fim, statusVal).subscribe({
      next: (dados) => {
        this.dashboard = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error(erro);
        this.carregando = false;
        this.erro = true;
      }
    });
  }

  limparFiltros(): void {
    this.dataInicio = '';
    this.dataFim = '';
    this.statusFiltro = '';
    this.carregarDashboard();
  }
}