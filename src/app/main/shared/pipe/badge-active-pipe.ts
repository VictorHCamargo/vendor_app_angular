import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeActive',
})
export class BadgeActivePipe implements PipeTransform {
  transform(value: boolean): string {
    const classeCor = value ? 'bg-success' : 'bg-secondary';
    const texto = value ? 'Ativo' : 'Inativo';

    return `<span class="badge ms-3 ${classeCor}">${texto}</span>`;
  }
}
