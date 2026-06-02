import { Component, input, output, Signal, WritableSignal } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { IPartFormConfig } from './interfaces/part-form-config';
import { ICategoryModel } from '../../../../../features/products/category/interfaces/category-model';

@Component({
  selector: 'app-part-form',
  imports: [Field],
  templateUrl: './part-form.html',
  styleUrl: './part-form.scss',
})
export class PartForm<MODEL> {
  info = input.required<IPartFormConfig<MODEL>>();
}
