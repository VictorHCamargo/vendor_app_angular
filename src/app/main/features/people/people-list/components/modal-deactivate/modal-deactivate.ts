import { Component, input, output } from '@angular/core';
import { TPersonModel } from '../../../interfaces/person-model';

@Component({
  selector: 'app-modal-deactivate',
  imports: [],
  templateUrl: './modal-deactivate.html',
  styleUrl: './modal-deactivate.scss',
})
export class ModalDeactivate {
  person = input<TPersonModel | null>();

  onClosed = output();

  onDeactivate = output<TPersonModel>();
}
