export interface OrdemServico {
  id?: number;

  descricao_problema: string;

  status: string;

  valor_total: number;

  veiculo_id: number;

  veiculo_modelo?: string;

  cliente_nome?: string;

  data_abertura?: string;
}