import { Component, inject } from '@angular/core';
import { minLength, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BaseForms } from '../../../../shared/class/base-form';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
import { IGroupModel } from '../interfaces/group-model';
import { GroupService } from '../services/group-service';
@Component({
  selector: 'app-group',
  imports: [FormInput, TranslatePipe],
  templateUrl: './group.html',
  styleUrl: './group.scss',
})
export class Group extends BaseForms<IGroupModel> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(GroupService);
  private toast = inject(ToastService);
  private translate = inject(TranslateService);
  constructor() {
    super();
    this.createForm(this.createModel({ id: null, name: '' }, this.route), (path) => {
      required(path.name, { message: this.t('VALIDATION.REQUIRED') });
      minLength(path.name, 3, { message: this.t('VALIDATION.MIN_LENGTH') });
    });
  }
  override onCancel(): void {
    this.router.navigate(['group', 'list']);
  }
  override onSave(): void {
    this.saving.set(true);
    this.service.save(this.model(), this.model().id).subscribe({
      next: () => {
        this.saving.set(false);
        this.toast.show(this.t(this.model().id ? 'SAVE.UPDATED' : 'SAVE.CREATED'), 'success');
        this.router.navigate(['group', 'list']);
      },
      error: () => {
        this.saving.set(false);
        this.toast.show(this.t('SAVE.ERROR'), 'danger');
      },
    });
  }
  get formName() {
    return this.formData.name;
  }
  private t(key: string): string {
    return this.translate.instant(`MAIN.FEATURES.PRODUCT_MASTER.${key}`);
  }
}
