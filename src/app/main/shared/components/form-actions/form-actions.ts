import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-actions',
  imports: [TranslatePipe],
  templateUrl: './form-actions.html',
  styleUrl: './form-actions.scss',
})
export class FormActions {
  saving = input.required<boolean>();
  disabled = input<boolean>(false);

  cancelLabel = input<string>('COMMONS.CANCEL');
  saveLabel = input<string>('COMMONS.SAVE');
  editLabel = input<string>('COMMONS.EDIT');
  isEditing = input<boolean>(false);

  canceled = output<void>();
  save = output<void>();
}
