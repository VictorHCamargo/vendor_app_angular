import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeActive',
})
export class BadgeActivePipe implements PipeTransform {
  transform(value: boolean): string {
    const classColor = value ? 'bg-success' : 'bg-secondary';
    const text = value ? 'Ativo' : 'Inativo';

    return `<span class="badge ms-3 ${classColor}">${text}</span>`;
  }
}
