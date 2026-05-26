export interface OrdemServico {

  id?: number;

  descricao: string;

  status: string;

  valor: number;

  // ID do veículo relacionado
  veiculo_id: number;
}