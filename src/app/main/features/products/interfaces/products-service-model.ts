export interface IProductsServiceModel {
  id: number | null;
  nome: string;
  descricao: string;
  id_categoria: number | null;
  id_moeda: number | null;
  id_marca: number | null;
  id_cores: number | null;
  id_unidade_medida: number | null;
  id_grupo: number | null;
  preco_compra: number;
  preco_venda: number;
  nome_categoria?: string;
  nome_moeda?: string;
  nome_marca?: string;
  nome_grupo?: string;
  nome_medida?: string;
  hexadecimal?: string;
}
