import { Component, input, output } from '@angular/core';
import { IMarkModel } from '../../interfaces/mark-model';

@Component({
  selector: 'app-modal-delete',
  imports: [],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.scss',
})
export class ModalDelete {
  mark = input.required<IMarkModel | null>();

  onClosed = output<void>();

  onDelete = output<IMarkModel>();
}
