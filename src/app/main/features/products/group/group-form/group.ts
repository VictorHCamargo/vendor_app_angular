import { Component, inject } from '@angular/core';
import { IGroupModel } from '../interfaces/group-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Field, minLength, required, submit } from '@angular/forms/signals';
import { GroupService } from '../services/group-service';
import { ErrorMessages } from '../../../../shared/components/error-messages/error-messages';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
import { BaseForms } from '../../../../shared/class/base-form';

@Component({
  selector: 'app-group',
  imports: [ErrorMessages,Field],
  templateUrl: './group.html',
  styleUrl: './group.scss',
})
export class Group extends BaseForms<IGroupModel> {
  toastService = inject(ToastService);
  groupService = inject(GroupService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  constructor() {
    super();
    this.createForm(
      this.createModel(
        {
          id : null,
          name : ''
        },
        this.route
      ),
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
        this.groupService.save(this.model(),this.model()?.id).subscribe({
          next: (_data) => {
            this.toastService.show(this.model()?.id ? "Grupo foi atualizado com sucesso" : "Grupo foi cadastrado com sucesso","success");
            setTimeout(() => {
              this.router.navigate(['group','list']);
              this.saving.set(false);
            },3000)
          },
          error: () => {
            this.toastService.show("Grupo não foi cadastrado","danger");
            this.saving.set(false);
          }
        })
      }
    )
  }

  override onCancel(): void {
    this.saving.set(true);
    this.toastService.show("Voltando a lista de Categoria","info",1500);
    this.router.navigate(['group','list']);
  }

  override idHelp = 'nomeHelp'
}
