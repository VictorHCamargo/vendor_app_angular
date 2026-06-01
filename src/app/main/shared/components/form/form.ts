import { Component, signal } from '@angular/core';
import { IFormConfig } from './interfaces/form-config';
import { ICategoryModel } from '../../../features/products/category/interfaces/category-model';
import { form } from '@angular/forms/signals';
import { IPartFormConfig } from './components/part-form/interfaces/part-form-config';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  testeArray = signal<IPartFormConfig<ICategoryModel>[]>([]);
  teste : IFormConfig<ICategoryModel> = {
    formInfo : {
      name : {
        idLabel : 'name',
        inputField : form(signal<ICategoryModel>({id : null, name : ''})),
        messageId : 'nameId',
        nameLabel : 'seila kkkkkkkkk',
        type : 'text'
      }
    }
  }

  mapDTO() {
    const formInfoArray = this.objectKeys(this.teste.formInfo); //TO-DO: Terminar de transformar o objeto formInfo em uma array acessivel para criar um formulario dinamico!

    console.log(this.teste.formInfo['name'])

  }
  constructor() {
    this.mapDTO()
  }

  get objectKeys() {
    return Object.keys
  }
}
