import { Component, computed, input } from '@angular/core';
import { ITableConfig } from './interfaces/table-config';
import { TranslatePipe } from '@ngx-translate/core';
import { TPersonModel } from '../../../features/people/interfaces/person-model';
import { BadgeActivePipe } from '../../pipe/badge-active-pipe';
import { FakePipe } from '../../pipe/fake-pipe';

@Component({
  selector: 'app-table',
  imports: [TranslatePipe, BadgeActivePipe, FakePipe],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<MODEL> {
  tableConfig = input<ITableConfig<MODEL>>();

  colspan = computed(() => {
    return (this.tableConfig()?.titles?.length ?? 0) + 1;
  });

  protected isInactive(model: any) {
    return 'active' in model ? !(model as TPersonModel).active : false;
  }
}
