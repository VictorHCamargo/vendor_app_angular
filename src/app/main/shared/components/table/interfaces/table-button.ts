export interface ITableButton<MODEL> {
  name: string;
  action: (data: MODEL, index: number) => void;
  show: () => boolean;
  style: string;
}
