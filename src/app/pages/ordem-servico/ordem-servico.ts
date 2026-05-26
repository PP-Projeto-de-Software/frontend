import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { OrdemServicoService } from '../../services/ordem-servico.service';

import { OrdemServico } from '../../models/ordem-servico';


@Component({
  selector: 'app-ordem-servico',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './ordem-servico.html',

  styleUrl: './ordem-servico.css'
})
export class OrdemServicoComponent implements OnInit {

  ordensServico: OrdemServico[] = [];


  novaOrdem: OrdemServico = {

    descricao: '',
    status: '',
    valor: 0,
    veiculo_id: 0
  };


  constructor(
    private ordemServicoService: OrdemServicoService
  ) {}


  ngOnInit(): void {

    this.carregarOrdensServico();
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

          this.carregarOrdensServico();

          this.novaOrdem = {

            descricao: '',
            status: '',
            valor: 0,
            veiculo_id: 0
          };
        },

        error: (erro) => {

          console.log(erro);
        }
      });
  }
}