export interface OrdemServico {

  id?: number;

  descricao_problema: string;

  status: string;

  valor_total: number;

  veiculo_id: number;

  cliente_nome?: string;

  veiculo_modelo?: string;
}