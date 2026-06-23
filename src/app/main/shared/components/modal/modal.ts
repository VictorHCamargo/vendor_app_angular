import { Component, effect, ElementRef, input, output, Signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  isOpen = input<boolean>(false);

  closed = output<void>();

  dialogElement : Signal<ElementRef<HTMLDialogElement> | undefined> = viewChild('dialogRef');

  constructor() {

    effect(() => {
      const modal = this.dialogElement()?.nativeElement;
      if (!modal) return;

      if (this.isOpen()) {
        modal.showModal();
      } else {
        modal.close();
      }
    });
  }

  onDialogClose() {
    this.closed.emit();
  }
}
