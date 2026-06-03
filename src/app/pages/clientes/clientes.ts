import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { ClienteService } from '../../services/cliente.service';

import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './clientes.html',

  styleUrl: './clientes.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  mostrarTabela = false;

  novoCliente: Cliente = {

    nome: '',
    telefone: '',
    email: ''
  };

  constructor(
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {

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

  cadastrarCliente(): void {

    this.clienteService
      .criarCliente(this.novoCliente)
      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Sucesso',

            text: 'Cliente cadastrado com sucesso!',

            confirmButtonColor: '#3b82f6'
          });

          this.carregarClientes();

          this.novoCliente = {

            nome: '',
            telefone: '',
            email: ''
          };
        },

        error: (erro) => {

          Swal.fire({

            icon: 'error',

            title: 'Erro',

            text: erro.error?.detail || 'Erro ao cadastrar cliente.',

            confirmButtonColor: '#1e3a8a'
          });
        }
      });
  }
}