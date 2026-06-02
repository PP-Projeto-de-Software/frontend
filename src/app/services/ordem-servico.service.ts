import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OrdemServico } from '../models/ordem-servico';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdemServicoService {
  // URL backend FastAPI
  private apiUrl = `${environment.apiUrl}/ordens-servico`;

  constructor(private http: HttpClient) {}

  // LISTAR ORDENS DE SERVIÇO
  listarOrdensServico(): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(this.apiUrl);
  }

  // CRIAR ORDEM DE SERVIÇO
  criarOrdemServico(ordem: OrdemServico): Observable<OrdemServico> {
    return this.http.post<OrdemServico>(this.apiUrl, ordem);
  }
}
