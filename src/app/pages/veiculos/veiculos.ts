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

  cadastrarVeiculo(): void {

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

          this.novoVeiculo = {

            modelo: '',

            marca: '',

            placa: '',

            ano: 0,

            cliente_id: 0
          };
        },

        error: (erro) => {

          Swal.fire({

            icon: 'error',

            title: 'Erro',

            text: erro.error?.detail || 'Erro ao cadastrar veículo.',

            confirmButtonColor: '#1e3a8a'
          });
        }
      });
  }
}