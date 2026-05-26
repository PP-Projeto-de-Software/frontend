import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

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

          this.carregarClientes();

          this.novoCliente = {

            nome: '',
            telefone: '',
            email: ''
          };
        },

        error: (erro) => {

          console.log(erro);
        }
      });
  }
}