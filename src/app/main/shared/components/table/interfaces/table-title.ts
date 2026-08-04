import { ITransformTableTitle } from './transform-table-title';

export interface ITableTitle<MODEL> {
  name: string;
  dataField: keyof MODEL;
  transform?: ITransformTableTitle;
}
