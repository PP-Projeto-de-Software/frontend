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

  modoEdicao = false;

  clienteEditandoId: number | null = null;

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

    if (this.modoEdicao && this.clienteEditandoId) {

      this.clienteService
        .atualizarCliente(
          this.clienteEditandoId,
          this.novoCliente
        )
        .subscribe({

          next: () => {

            Swal.fire({

              icon: 'success',

              title: 'Atualizado',

              text: 'Cliente atualizado com sucesso!',

              confirmButtonColor: '#3b82f6'
            });

            this.carregarClientes();

            this.cancelarEdicao();
          },

          error: (erro) => {

            Swal.fire({

              icon: 'error',

              title: 'Erro',

              text:
                erro.error?.detail ||
                'Erro ao atualizar cliente.'
            });
          }
        });

      return;
    }

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

            text:
              erro.error?.detail ||
              'Erro ao cadastrar cliente.',

            confirmButtonColor: '#1e3a8a'
          });
        }
      });
  }

  editarCliente(cliente: Cliente): void {

    this.modoEdicao = true;

    this.clienteEditandoId = cliente.id!;

    this.novoCliente = {

      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email
    };

    window.scrollTo({

      top: 0,

      behavior: 'smooth'
    });
  }

  cancelarEdicao(): void {

    this.modoEdicao = false;

    this.clienteEditandoId = null;

    this.novoCliente = {

      nome: '',
      telefone: '',
      email: ''
    };
  }

  excluirCliente(id: number): void {

    Swal.fire({

      title: 'Deseja excluir?',

      text: 'Essa ação não poderá ser desfeita.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sim',

      cancelButtonText: 'Cancelar',

      confirmButtonColor: '#dc3545'
    }).then((result) => {

      if (!result.isConfirmed) {

        return;
      }

      this.clienteService
        .deletarCliente(id)
        .subscribe({

          next: () => {

            Swal.fire({

              icon: 'success',

              title: 'Excluído',

              text: 'Cliente removido com sucesso!'
            });

            this.carregarClientes();
          },

          error: () => {

            Swal.fire({

              icon: 'error',

              title: 'Erro',

              text: 'Não foi possível excluir.'
            });
          }
        });
    });
  }
}