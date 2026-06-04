import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrdemServico } from '../models/ordem-servico';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdemServicoService {

  private apiUrl = `${environment.apiUrl}/ordens-servico`;

  constructor(private http: HttpClient) {}

  listarOrdensServico(): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<OrdemServico> {
    return this.http.get<OrdemServico>(`${this.apiUrl}/${id}`);
  }

  criarOrdemServico(ordem: OrdemServico): Observable<OrdemServico> {
    return this.http.post<OrdemServico>(this.apiUrl, ordem);
  }

  atualizarOrdemServico(id: number, ordem: OrdemServico): Observable<OrdemServico> {
    return this.http.put<OrdemServico>(`${this.apiUrl}/${id}`, ordem);
  }

  deletarOrdemServico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterDashboard(
    dataInicio?: string,
    dataFim?: string,
    statusFiltro?: string
  ): Observable<any> {
    let params = new HttpParams();

    if (dataInicio) params = params.set('data_inicio', dataInicio);
    if (dataFim)    params = params.set('data_fim', dataFim);
    if (statusFiltro) params = params.set('status_filtro', statusFiltro);

    return this.http.get<any>(`${this.apiUrl}/dashboard`, { params });
  }
}