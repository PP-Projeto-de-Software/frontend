import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { VeiculoService } from '../../services/veiculo.service';

import { Veiculo } from '../../models/veiculo';


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


  novoVeiculo: Veiculo = {

    modelo: '',
    marca: '',
    placa: '',
    ano: 0,
    cliente_id: 0
  };


  constructor(
    private veiculoService: VeiculoService
  ) {}


  ngOnInit(): void {

    this.carregarVeiculos();
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


  cadastrarVeiculo(): void {

    this.veiculoService
      .criarVeiculo(this.novoVeiculo)
      .subscribe({

        next: () => {

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

          console.log(erro);
        }
      });
  }
}