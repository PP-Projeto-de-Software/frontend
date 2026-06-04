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
  imports: [FormsModule],
  templateUrl: './ordem-servico.html',
  styleUrl: './ordem-servico.css',
})
export class OrdemServicoComponent implements OnInit {

  ordensServico: OrdemServico[] = [];

  clientes: Cliente[] = [];

  veiculosCliente: Veiculo[] = [];

  clienteSelecionado = 0;

  mostrarTabela = false;

  modoEdicao = false;

  ordemEditandoId: number | null = null;

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

      this.novaOrdem.veiculo_id = 0;

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

    if (!this.novaOrdem.veiculo_id) {

      Swal.fire({
        icon: 'warning',
        title: 'Veículo obrigatório',
        text: 'Selecione um veículo.',
        confirmButtonColor: '#1e3a8a'
      });

      return;
    }

    this.ordemServicoService
      .criarOrdemServico(this.novaOrdem)
      .subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Ordem cadastrada com sucesso!',
            confirmButtonColor: '#3b82f6'
          });

          this.carregarOrdensServico();

          this.limparFormulario();
        },

        error: (erro) => {

          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text:
              erro.error?.detail ||
              'Erro ao cadastrar ordem.',
            confirmButtonColor: '#1e3a8a'
          });
        }
      });
  }

  editarOrdem(ordem: OrdemServico): void {

    if (!ordem.id) {
      return;
    }

    this.modoEdicao = true;

    this.ordemEditandoId = ordem.id;

    const cliente = this.clientes.find(
      c => c.nome === ordem.cliente_nome
    );

    if (cliente) {

      this.clienteSelecionado = cliente.id!;

      this.onClienteChange();
    }

    this.novaOrdem = {
      descricao_problema: ordem.descricao_problema,
      status: ordem.status,
      valor_total: ordem.valor_total,
      veiculo_id: ordem.veiculo_id
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  atualizarOrdemServico(): void {

    if (this.ordemEditandoId === null) {
      return;
    }

    this.ordemServicoService
      .atualizarOrdemServico(
        this.ordemEditandoId,
        this.novaOrdem
      )
      .subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Atualizado',
            text: 'Ordem atualizada com sucesso!',
            confirmButtonColor: '#3b82f6'
          });

          this.carregarOrdensServico();

          this.limparFormulario();
        },

        error: (erro) => {

          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text:
              erro.error?.detail ||
              'Erro ao atualizar ordem.',
            confirmButtonColor: '#1e3a8a'
          });
        }
      });
  }

  excluirOrdem(id: number): void {

    Swal.fire({

      title: 'Excluir ordem?',

      text: 'Essa ação não poderá ser desfeita.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sim',

      confirmButtonColor: '#3b82f6',

      cancelButtonText: 'Cancelar'

    }).then((resultado) => {

      if (!resultado.isConfirmed) {
        return;
      }

      this.ordemServicoService
        .deletarOrdemServico(id)
        .subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Excluído',
              text: 'Ordem removida com sucesso.',
              confirmButtonColor: '#1e3a8a'
            });

            this.carregarOrdensServico();
          },

          error: () => {

            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Não foi possível excluir.',
              confirmButtonColor: '#1e3a8a'
            });
          }
        });
    });
  }

  cancelarEdicao(): void {

    this.limparFormulario();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  limparFormulario(): void {

    this.modoEdicao = false;

    this.ordemEditandoId = null;

    this.clienteSelecionado = 0;

    this.veiculosCliente = [];

    this.novaOrdem = {
      descricao_problema: '',
      status: 'Pendente',
      valor_total: 0,
      veiculo_id: 0
    };
  }
}