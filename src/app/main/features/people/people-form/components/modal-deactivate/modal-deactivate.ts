import { Component, input, output } from '@angular/core';
import { IAddressEvent } from '../../../interfaces/address-event';
import { TypeAddressNamePipe } from '../../../../../shared/pipe/type-address-name-pipe';

@Component({
  selector: 'app-modal-deactivate',
  imports: [TypeAddressNamePipe],
  templateUrl: './modal-deactivate.html',
  styleUrl: './modal-deactivate.scss',
})
export class ModalDeactivate {
  address = input.required<IAddressEvent>();

  closed = output<void>();

  deactivate = output<IAddressEvent>();
}
