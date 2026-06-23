import { Pipe, PipeTransform } from '@angular/core';
import { TTypeAddress } from '../../features/people/interfaces/address-model';

@Pipe({
  name: 'typeAddressName',
})
export class TypeAddressNamePipe implements PipeTransform {
  transform(value: TTypeAddress, ...args: unknown[]): string {
    switch(value) {
      case 'M': return 'Moradia'
      case 'C': return 'Cobranca'
      case 'E': return 'Entrega'
    }
  }
}
