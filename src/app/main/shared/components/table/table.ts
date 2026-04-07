import { Component, input } from '@angular/core';
import { ITableConfig } from './interfaces/table-config';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<MODEL> {
  tableConfig = input<ITableConfig<MODEL>>();
}
