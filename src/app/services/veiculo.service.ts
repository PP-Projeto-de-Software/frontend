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

  listarVeiculos(): Observable<Veiculo[]> {

    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  listarPorCliente(
    clienteId: number
  ): Observable<Veiculo[]> {

    return this.http.get<Veiculo[]>(
      `${this.apiUrl}/cliente/${clienteId}`
    );
  }

  criarVeiculo(
    veiculo: Veiculo
  ): Observable<Veiculo> {

    return this.http.post<Veiculo>(
      this.apiUrl,
      veiculo
    );
  }

  atualizarVeiculo(
    id: number,
    veiculo: Veiculo
  ): Observable<Veiculo> {

    return this.http.put<Veiculo>(
      `${this.apiUrl}/${id}`,
      veiculo
    );
  }

  deletarVeiculo(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}