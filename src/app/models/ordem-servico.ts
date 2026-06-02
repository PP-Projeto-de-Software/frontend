export interface OrdemServico {
  id?: number;

  descricao_problema: string;

  status: string;

  valor: number;

  // ID do veículo relacionado
  veiculo_id: number;
}
