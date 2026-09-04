export interface IApiResponse<TData> {
  executado: boolean;
  mensagem: string;
  data: TData;
}
