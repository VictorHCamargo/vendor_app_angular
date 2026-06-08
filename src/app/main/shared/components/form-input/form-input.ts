import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { IFormInputConfig } from './interfaces/form-input-config';
import { ErrorMessages } from '../error-messages/error-messages';

@Component({
  selector: 'app-form-input',
  imports: [Field, ErrorMessages],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput<MODEL> {
  info = input.required<IFormInputConfig<MODEL>>();

  get stringField() {
    return this.info().inputField as FieldTree<string>
  }
}
