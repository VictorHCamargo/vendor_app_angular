import { Component, inject } from '@angular/core';
import { BaseForms } from '../../../../shared/class/base-form';
import { IMarkModel } from '../interfaces/mark-model';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { minLength, required } from '@angular/forms/signals';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
import { MarkService } from '../services/mark-service';

@Component({
  selector: 'app-mark',
  imports: [FormInput, TranslatePipe],
  templateUrl: './mark.html',
  styleUrl: './mark.scss',
})
export class Mark extends BaseForms<IMarkModel> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private markService = inject(MarkService);

  constructor() {
    super();
    this.createForm(
      this.createModel(
        {
          id: null,
          name: '',
        },
        this.route,
      ),
      (Path) => {
        required(Path.name, { message: 'O campo nome e obrigatorio!' });
        minLength(Path.name, 3, { message: 'O campo nome tem o tamanho minimo de 3 letras!' });
      },
    );
  }

  override onCancel(): void {
    this.router.navigate(['mark', 'list']);
  }

  override onSave(): void {
    this.saving.set(true);
    this.markService.save(this.model(),this.model().id).subscribe(
      {
        next : (_) => {
          this.saving.set(false);
          this.router.navigate(['mark','list']);
          this.toastService.show(this.model().id ? 'Marca atualizada com sucesso!' : 'Marca cadastrada com sucesso!','success');
        },
        error : (_) => {
          this.saving.set(false);
          this.toastService.show(this.model().id ? 'Nao foi possivel atualizar por ser de empresa!' : 'Nao foi possivel cadastrar!','danger');
        }
      }
    )

  }

  get formName() {
    return this.formData.name;
  }
}
