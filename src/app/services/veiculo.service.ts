import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Veiculo } from '../models/veiculo';


@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  // URL backend FastAPI
  private apiUrl = 'http://127.0.0.1:8000/veiculos';


  constructor(
    private http: HttpClient
  ) {}


  // LISTAR VEÍCULOS
  listarVeiculos(): Observable<Veiculo[]> {

    return this.http.get<Veiculo[]>(
      this.apiUrl
    );
  }


 // CRIAR VEÍCULO
  criarVeiculo(
    veiculo: Veiculo
  ): Observable<Veiculo> {

    return this.http.post<Veiculo>(
      this.apiUrl,
      veiculo
    );
  }
}