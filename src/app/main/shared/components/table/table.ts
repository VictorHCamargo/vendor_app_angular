import { Component, computed, input } from '@angular/core';
import { ITableConfig } from './interfaces/table-config';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<MODEL> {
  tableConfig = input<ITableConfig<MODEL>>();

  colspan = computed(() => {
    return this.tableConfig()?.titles?.length! + 1
  })
}
