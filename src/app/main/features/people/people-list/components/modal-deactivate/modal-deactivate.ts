import { Component, input, output } from '@angular/core';
import { TPersonModel } from '../../../interfaces/person-model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-deactivate',
  imports: [TranslatePipe],
  templateUrl: './modal-deactivate.html',
  styleUrl: './modal-deactivate.scss',
})
export class ModalDeactivate {
  person = input<TPersonModel | null>();

  closed = output<void>();

  deactivate = output<TPersonModel>();
}
