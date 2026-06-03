import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Cliente } from '../models/cliente';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  // URL backend FastAPI
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  // LISTAR CLIENTES
  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // CRIAR CLIENTES
  criarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
}
