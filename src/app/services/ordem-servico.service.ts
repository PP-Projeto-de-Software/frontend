import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OrdemServico } from '../models/ordem-servico';


@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  // URL backend FastAPI
  private apiUrl = 'http://127.0.0.1:8000/ordens-servico';


  constructor(
    private http: HttpClient
  ) {}


   
  // LISTAR ORDENS DE SERVIÇO
  listarOrdensServico(): Observable<OrdemServico[]> {

    return this.http.get<OrdemServico[]>(
      this.apiUrl
    );
  }



  // CRIAR ORDEM DE SERVIÇO
  criarOrdemServico(
    ordem: OrdemServico
  ): Observable<OrdemServico> {

    return this.http.post<OrdemServico>(
      this.apiUrl,
      ordem
    );
  }
}