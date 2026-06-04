import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OrdemServico } from '../models/ordem-servico';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdemServicoService {

  private apiUrl =
    `${environment.apiUrl}/ordens-servico`;

  constructor(
    private http: HttpClient
  ) { }

  // LISTAR
  listarOrdensServico(): Observable<OrdemServico[]> {

    return this.http.get<OrdemServico[]>(
      this.apiUrl
    );
  }

  // BUSCAR POR ID
  buscarPorId(
    id: number
  ): Observable<OrdemServico> {

    return this.http.get<OrdemServico>(
      `${this.apiUrl}/${id}`
    );
  }

  // CRIAR
  criarOrdemServico(
    ordem: OrdemServico
  ): Observable<OrdemServico> {

    return this.http.post<OrdemServico>(
      this.apiUrl,
      ordem
    );
  }

  // EDITAR
  atualizarOrdemServico(
    id: number,
    ordem: OrdemServico
  ): Observable<OrdemServico> {

    return this.http.put<OrdemServico>(
      `${this.apiUrl}/${id}`,
      ordem
    );
  }

  // EXCLUIR
  deletarOrdemServico(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  obterDashboard(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/dashboard`
    );
  }
}