import { Component, inject } from '@angular/core';
import { BaseForms } from '../../../../shared/class/base-form';
import { IColorModel } from '../interfaces/color-model';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { pattern, required } from '@angular/forms/signals';
import { ColorService } from '../services/color-service';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-color',
  imports: [FormInput, TranslatePipe],
  templateUrl: './color.html',
  styleUrl: './color.scss',
})
export class Color extends BaseForms<IColorModel> {
  toastService = inject(ToastService);
  colorService = inject(ColorService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    super();
    this.createForm(
      this.createModel(
        {
          id: null,
          active: true,
          hexadecimal: '',
        },
        this.route,
      ),
      (Path) => {
        pattern(Path.hexadecimal, /^#([A-F a-f 0-9]{6}|[A-F a-f 0-9]{3})$/, {
          message: 'O campo hexadecimal aceita apenas #00000000!',
        });
        required(Path.hexadecimal, { message: 'O campo hexadecimal e obrigatorio!' });
      },
    );
  }

  override onCancel(): void {
    this.router.navigate(['color', 'list']);
  }

  override onSalve(): void {
    this.saving.set(true);
    this.colorService.save(this.model(), this.model().id).subscribe({
      next: (_) => {
        this.toastService.show(
          this.model().id ? 'Cor atualizada com sucesso' : 'Cor cadastrada com sucesso',
          'success',
        );
        this.saving.set(false);
        this.router.navigate(['color', 'list']);
      },
      error: (error) => {
        console.log(error)
        this.toastService.show(
          this.model().id ? 'nao foi possivel atualizar!' : 'nao foi possivel cadastrar!',
          'danger',
        );
        this.saving.set(false);
      },
    });
  }

  get formActive() {
    return this.formData.active;
  }

  get formHexadecimal() {
    return this.formData.hexadecimal;
  }
}
