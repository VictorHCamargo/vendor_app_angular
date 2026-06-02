import { Component, input, signal } from '@angular/core';
import { IFormConfig } from './interfaces/form-config';
import { ICategoryModel } from '../../../features/products/category/interfaces/category-model';
import { form } from '@angular/forms/signals';
import { IPartFormConfig } from './components/part-form/interfaces/part-form-config';
import { PartForm } from './components/part-form/part-form';

@Component({
  selector: 'app-form',
  imports: [PartForm],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form<MODEL> {
  model = input.required<MODEL>();
  fieldArray = signal<IPartFormConfig<MODEL>[]>([]);
  form = input.required<IFormConfig<MODEL>>()

  constructor() {
    this.mapDTO();
  }

  mapDTO() {
    const formInfoArray = this.objectKeys(this.form().formInfo);

    formInfoArray.forEach((key: string) => {
      const keyModel = key as keyof MODEL;

      const dataFormInfo = this.form().formInfo[keyModel];

      if (dataFormInfo != undefined) {
        this.fieldArray.update((value) => [dataFormInfo, ...value]);
      }
    });
  }

  get objectKeys() {
    return Object.keys;
  }

  get fieldRows() : IPartFormConfig<MODEL>[][] {
    const rows : IPartFormConfig<MODEL>[][] = [];

    for (let i = 0; i < this.fieldArray().length; i += this.form().fieldsPerRow) {
      const rowPiece = this.fieldArray().slice(i, i + this.form().fieldsPerRow);

      rows.push(rowPiece);
    }

    return rows;
  }
}