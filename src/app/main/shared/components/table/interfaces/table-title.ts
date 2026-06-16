export interface ITableTitle<MODEL> {
  name: string;
  dataField: keyof MODEL;
  transform?: (value: any) => string;
}
