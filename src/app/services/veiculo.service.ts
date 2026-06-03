import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Veiculo } from '../models/veiculo';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {

  private apiUrl = `${environment.apiUrl}/veiculos`;

  constructor(
    private http: HttpClient
  ) {}

  // LISTAR TODOS
  listarVeiculos(): Observable<Veiculo[]> {

    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  // BUSCAR POR CLIENTE
  listarPorCliente(
    clienteId: number
  ): Observable<Veiculo[]> {

    return this.http.get<Veiculo[]>(
      `${this.apiUrl}/cliente/${clienteId}`
    );
  }

  // CRIAR
  criarVeiculo(
    veiculo: Veiculo
  ): Observable<Veiculo> {

    return this.http.post<Veiculo>(
      this.apiUrl,
      veiculo
    );
  }

  // EDITAR
  atualizarVeiculo(
    id: number,
    veiculo: Veiculo
  ): Observable<Veiculo> {

    return this.http.put<Veiculo>(
      `${this.apiUrl}/${id}`,
      veiculo
    );
  }

  // EXCLUIR
  deletarVeiculo(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}