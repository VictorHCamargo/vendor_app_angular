import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-error-messages',
  imports: [],
  templateUrl: './error-messages.html',
  styleUrl: './error-messages.scss',
})
export class ErrorMessages {
  message = input<FieldState<string>>();
  messageId = input<string>();
}
