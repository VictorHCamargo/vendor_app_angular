import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-error-messages',
  imports: [TranslatePipe],
  templateUrl: './error-messages.html',
  styleUrl: './error-messages.scss',
})
export class ErrorMessages {
  message = input<FieldState<unknown>>();
  messageId = input<string>();
}
