import { Component, inject } from '@angular/core';
import { BaseForms } from '../../../../shared/class/base-form';
import { IColorModel } from '../interfaces/color-model';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
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
  private toastService = inject(ToastService);
  private colorService = inject(ColorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);

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
          message: this.traduction('VALIDATION.HEX'),
        });
        required(Path.hexadecimal, { message: this.traduction('VALIDATION.REQUIRED') });
      },
    );
  }

  override onCancel(): void {
    this.router.navigate(['color', 'list']);
  }

  override onSave(): void {
    this.saving.set(true);
    this.colorService.save(this.model(), this.model().id).subscribe({
      next: (_) => {
        this.toastService.show(
          this.traduction(this.model().id ? 'SAVE.UPDATED' : 'SAVE.CREATED'),
          'success',
        );
        this.saving.set(false);
        this.router.navigate(['color', 'list']);
      },
      error: (error) => {
        console.log(error);
        this.toastService.show(
          this.traduction('SAVE.ERROR'),
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

  private traduction(key: string): string {
    return this.translate.instant(`MAIN.FEATURES.PRODUCT_MASTER.${key}`);
  }
}
