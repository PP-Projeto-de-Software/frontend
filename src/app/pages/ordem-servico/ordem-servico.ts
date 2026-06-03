import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { OrdemServicoService } from '../../services/ordem-servico.service';
import { ClienteService } from '../../services/cliente.service';
import { VeiculoService } from '../../services/veiculo.service';

import { OrdemServico } from '../../models/ordem-servico';
import { Cliente } from '../../models/cliente';
import { Veiculo } from '../../models/veiculo';

@Component({
  selector: 'app-ordem-servico',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './ordem-servico.html',

  styleUrl: './ordem-servico.css',
})
export class OrdemServicoComponent implements OnInit {

  ordensServico: OrdemServico[] = [];

  clientes: Cliente[] = [];

  veiculosCliente: Veiculo[] = [];

  clienteSelecionado = 0;

  mostrarTabela = false;

  novaOrdem: OrdemServico = {

    descricao_problema: '',

    status: 'Pendente',

    valor_total: 0,

    veiculo_id: 0
  };

  constructor(
    private ordemServicoService: OrdemServicoService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit(): void {

    this.carregarOrdensServico();

    this.carregarClientes();
  }

  toggleTabela(): void {

    this.mostrarTabela = !this.mostrarTabela;
  }

  carregarClientes(): void {

    this.clienteService
      .listarClientes()
      .subscribe({

        next: (dados) => {

          this.clientes = dados;
        },

        error: (erro) => {

          console.log(erro);
        }
      });
  }

  onClienteChange(): void {

    if (!this.clienteSelecionado) {

      this.veiculosCliente = [];

      return;
    }

    this.veiculoService
      .listarPorCliente(this.clienteSelecionado)
      .subscribe({

        next: (dados) => {

          this.veiculosCliente = dados;
        },

        error: (erro) => {

          console.log(erro);
        }
      });
  }

  carregarOrdensServico(): void {

    this.ordemServicoService
      .listarOrdensServico()
      .subscribe({

        next: (dados) => {

          this.ordensServico = dados;
        },

        error: (erro) => {

          console.log(erro);
        }
      });
  }

  cadastrarOrdemServico(): void {

    this.ordemServicoService
      .criarOrdemServico(this.novaOrdem)
      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Sucesso',

            text: 'Ordem de serviço cadastrada com sucesso!',

            confirmButtonColor: '#3b82f6'
          });

          this.carregarOrdensServico();

          this.novaOrdem = {

            descricao_problema: '',

            status: 'Pendente',

            valor_total: 0,

            veiculo_id: 0
          };
        },

        error: (erro) => {

          Swal.fire({

            icon: 'error',

            title: 'Erro',

            text: erro.error?.detail || 'Erro ao cadastrar ordem de serviço.',

            confirmButtonColor: '#1e3a8a'
          });
        }
      });
  }
}