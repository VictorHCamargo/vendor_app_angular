import { Component, computed, inject, input } from '@angular/core';
import { ITableConfig } from './interfaces/table-config';
import { TranslatePipe } from '@ngx-translate/core';
import { TPersonModel } from '../../../features/people/interfaces/person-model';

@Component({
  selector: 'app-table',
  imports: [TranslatePipe],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<MODEL> {
  tableConfig = input<ITableConfig<MODEL>>();

  colspan = computed(() => {
    return this.tableConfig()?.titles?.length! + 1;
  });

  active(model: any) {
    return !(model as TPersonModel).active
  }
}
