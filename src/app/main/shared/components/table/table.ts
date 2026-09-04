import { Component, computed, input } from '@angular/core';
import { ITableConfig } from './interfaces/table-config';
import { TranslatePipe } from '@ngx-translate/core';
import { ActiveBadge } from '../active-badge/active-badge';
import { ColorSwatch } from '../color-swatch/color-swatch';
import { ITableTitle } from './interfaces/table-title';

@Component({
  selector: 'app-table',
  imports: [ActiveBadge, ColorSwatch, TranslatePipe],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<MODEL> {
  tableConfig = input<ITableConfig<MODEL>>({
    buttons: [],
    data: [],
    titles: [],
  });

  protected readonly hasActions = computed(() => this.tableConfig().buttons.length > 0);
  protected readonly colspan = computed(
    () => this.tableConfig().titles.length + (this.hasActions() ? 1 : 0),
  );

  protected isInactive(model: MODEL): boolean {
    return (model as MODEL & { active?: boolean }).active === false;
  }

  protected transformedValue(title: ITableTitle<MODEL>, model: MODEL): unknown {
    const value = model[title.dataField];
    return title.transform?.transform(value) ?? value;
  }

  protected asBoolean(value: unknown): boolean {
    return value === true;
  }

  protected asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }
}
