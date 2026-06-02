import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Veiculo } from '../models/veiculo';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  // URL backend FastAPI
  private apiUrl = `${environment.apiUrl}/veiculos`;

  constructor(private http: HttpClient) {}

  // LISTAR VEÍCULOS
  listarVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  // CRIAR VEÍCULO
  criarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, veiculo);
  }
}
