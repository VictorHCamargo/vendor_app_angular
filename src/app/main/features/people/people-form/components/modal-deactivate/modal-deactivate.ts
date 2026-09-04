import { Component, input, output } from '@angular/core';
import { IAddressEvent } from '../../../interfaces/address-event';
import { TypeAddressNamePipe } from '../../../../../shared/pipe/type-address-name-pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-deactivate',
  imports: [TranslatePipe, TypeAddressNamePipe],
  templateUrl: './modal-deactivate.html',
  styleUrl: './modal-deactivate.scss',
})
export class ModalDeactivate {
  address = input<IAddressEvent | null>(null);

  closed = output<void>();

  deactivate = output<IAddressEvent>();
}
