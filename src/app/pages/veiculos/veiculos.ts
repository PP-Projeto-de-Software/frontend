import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { VeiculoService } from '../../services/veiculo.service';
import { ClienteService } from '../../services/cliente.service';

import { Veiculo } from '../../models/veiculo';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-veiculos',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './veiculos.html',

  styleUrl: './veiculos.css'
})
export class VeiculosComponent implements OnInit {

  veiculos: Veiculo[] = [];

  clientes: Cliente[] = [];

  mostrarTabela = false;

  editando = false;

  veiculoEditandoId?: number;

  novoVeiculo: Veiculo = {
    modelo: '',
    marca: '',
    placa: '',
    ano: 0,
    cliente_id: 0
  };

  constructor(
    private veiculoService: VeiculoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {

    this.carregarVeiculos();

    this.carregarClientes();
  }

  toggleTabela(): void {

    this.mostrarTabela = !this.mostrarTabela;
  }

  carregarVeiculos(): void {

    this.veiculoService
      .listarVeiculos()
      .subscribe({

        next: (dados) => {

          this.veiculos = dados;
        },

        error: (erro) => {

          console.log(erro);
        }
      });
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

  limparFormulario(): void {

    this.novoVeiculo = {

      modelo: '',

      marca: '',

      placa: '',

      ano: 0,

      cliente_id: 0
    };

    this.editando = false;

    this.veiculoEditandoId = undefined;
  }

  cadastrarVeiculo(): void {

    this.novoVeiculo.placa =
      this.novoVeiculo.placa
        .trim()
        .toUpperCase();

    if (!this.novoVeiculo.cliente_id) {

      Swal.fire({
        icon: 'warning',
        title: 'Cliente obrigatório',
        confirmButtonColor: '#1e3a8a',
        text: 'Selecione um cliente.'
      });

      return;
    }

    this.veiculoService
      .criarVeiculo(this.novoVeiculo)
      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Sucesso',

            text: 'Veículo cadastrado com sucesso!',

            confirmButtonColor: '#3b82f6'
          });

          this.carregarVeiculos();

          this.limparFormulario();
        },

        error: (erro) => {

          if (
            erro.status === 400 &&
            erro.error?.detail?.includes('placa')
          ) {

            Swal.fire({
              icon: 'warning',
              title: 'Placa já cadastrada',
              confirmButtonColor: '#1e3a8a',
              text: erro.error.detail
            });

            return;
          }

          Swal.fire({

            icon: 'error',

            title: 'Erro',

            confirmButtonColor: '#1e3a8a',

            text: erro.error?.detail || 'Erro ao cadastrar veículo.'
          });
        }
      });
  }

  editarVeiculo(veiculo: Veiculo): void {

    this.editando = true;

    this.veiculoEditandoId = veiculo.id;

    this.novoVeiculo = {

      ...veiculo
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  atualizarVeiculo(): void {

    if (!this.veiculoEditandoId) {
      return;
    }

    this.veiculoService
      .atualizarVeiculo(
        this.veiculoEditandoId,
        this.novoVeiculo
      )
      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Atualizado',

            confirmButtonColor: '#3b82f6',

            text: 'Veículo atualizado com sucesso!'
          });

          this.carregarVeiculos();

          this.limparFormulario();
        },

        error: (erro) => {

          Swal.fire({

            icon: 'error',

            title: 'Erro',

            confirmButtonColor: '#1e3a8a',

            text: erro.error?.detail || 'Erro ao atualizar.'
          });
        }
      });
  }

  excluirVeiculo(id: number): void {

    Swal.fire({

      title: 'Excluir veículo?',

      text: 'Essa ação não poderá ser desfeita.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sim',

      confirmButtonColor: '#3b82f6',

      cancelButtonText: 'Cancelar'
    })
    .then((resultado) => {

      if (!resultado.isConfirmed) {
        return;
      }

      this.veiculoService
        .deletarVeiculo(id)
        .subscribe({

          next: () => {

            Swal.fire({

              icon: 'success',

              title: 'Excluído',

              confirmButtonColor: '#1e3a8a',

              text: 'Veículo removido com sucesso.'
            });

            this.carregarVeiculos();
          },

          error: () => {

            Swal.fire({

              icon: 'error',

              title: 'Erro',

              confirmButtonColor: '#1e3a8a',

              text: 'Não foi possível excluir.'
            });
          }
        });
    });
  }
}