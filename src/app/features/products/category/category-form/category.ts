import { Component, computed, inject } from '@angular/core';
import { ICategoryModel } from '../interfaces/category-model';
import { Field,required,minLength, submit } from '@angular/forms/signals';
import { BaseForms } from '../../../../shared/class/base-form';
import { ErrorMessages } from "../../../../shared/components/error-messages/error-messages";
import { CategoryService } from '../services/category-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessages } from '../../../../shared/components/toast-messages/toast-messages';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';



@Component({
  selector: 'app-category',
  imports: [Field,ErrorMessages],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category extends BaseForms<ICategoryModel> {
  toastService = inject(ToastService);
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    super();
    this.createForm(
      this.createModel(
        {
          "id" : null,
          "name" : ""
        },
        this.route
      )
      ,
      (Path) => {
        required(Path.name,{message : "O campo nome é obrigatório"})
        minLength(Path.name,3,{message : "O campo nome precisa ter no mínimo 3 letras"})
      }
    )
  }

  

  override onSalve(): void {
    submit(
      this.formData,
      async () => {
        this.saving.set(true);
        this.categoryService.save(this.model(),this.model().id).subscribe({
          next: (_data) => {
            this.saving.set(false);
            this.model().id ? this.toastService.show("Categoria atualizada com sucesso","success") : this.toastService.show("Categoria cadastrada com sucesso","success")
            setTimeout(() => {
              this.router.navigate(['category','list']);
            },3000)
          }, error: () => {
            this.saving.set(false);
            this.toastService.show("Erro ao cadastrar","danger");
          }
        })
      }
    )
  }

  override onCancel(): void {
    this.saving.set(true);
    this.toastService.show("Voltando a lista de Categoria","info",1500);
    this.router.navigate(['category','list']);
  }

  override idHelp = "nomeHelp";

} 

