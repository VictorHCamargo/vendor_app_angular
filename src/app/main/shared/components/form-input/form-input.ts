import { Component, input, output } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { IFormInputConfig, TTypeInput } from './interfaces/form-input-config';
import { ErrorMessages } from '../error-messages/error-messages';

@Component({
  selector: 'app-form-input',
  imports: [Field, ErrorMessages],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput<MODEL> {
  info = input.required<IFormInputConfig<MODEL>>();
  type = input.required<TTypeInput>();
  messageId = input.required<string>();
  fieldTree = input.required<FieldTree<string | number | boolean | null>>();

  onChange = output<Event>();

  get stringField() {
    return this.fieldTree() as FieldTree<string>;
  }

  get booleanField() {
    return this.fieldTree() as FieldTree<boolean>;
  }
}
