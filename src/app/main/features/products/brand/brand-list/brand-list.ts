import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BaseList } from '../../../../shared/class/base-list';
import { Modal } from '../../../../shared/components/modal/modal';
import { ProductDeleteModal } from '../../../../shared/components/product-delete-modal/product-delete-modal';
import { Table } from '../../../../shared/components/table/table';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
import { IBrandModel } from '../interfaces/brand-model';
import { BrandService } from '../services/brand-service';

@Component({
  selector: 'app-brand-list',
  imports: [TranslatePipe, Table, Modal, ProductDeleteModal],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.scss',
})
export class BrandList extends BaseList<IBrandModel> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(BrandService);
  private toast = inject(ToastService);
  private translate = inject(TranslateService);
  private modalOpen = signal(false);
  openModal = computed(() => this.modalOpen());
  selected = signal<IBrandModel | null>(null);
  constructor() {
    super();
    this.createData();
  }
  override createData(): void {
    this.dataModel.set(toSignal(this.route.data)()?.['data']);
    this.configTable = computed(() => ({
      data: this.dataModel(),
      titles: [{ name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.NAME', dataField: 'name' }],
      buttons: [
        {
          name: 'COMMONS.EDIT',
          show: () => true,
          action: (item) => this.router.navigate(['brand', 'form', item.id]),
          style: 'btn btn-primary',
        },
        {
          name: 'COMMONS.DELE',
          show: () => true,
          action: (item) => {
            this.selected.set(item);
            this.modalOpen.set(true);
          },
          style: 'btn btn-danger',
        },
      ],
    }));
  }
  override reloadData(): void {
    this.service.search().subscribe((data) => this.dataModel.set(data));
  }
  override onNewRegister(): void {
    this.router.navigate(['brand', 'form']);
  }
  closeModal(): void {
    this.modalOpen.set(false);
  }
  deleteSelected(): void {
    const item = this.selected();
    if (!item?.id) return;
    this.service.delete(item.id).subscribe({
      next: () => {
        this.reloadData();
        this.toast.show(this.t('DELETE.SUCCESS'), 'success');
        this.closeModal();
      },
      error: () => {
        this.toast.show(this.t('DELETE.ERROR'), 'danger');
        this.closeModal();
      },
    });
  }
  private t(key: string): string {
    return this.translate.instant(`MAIN.FEATURES.PRODUCT_MASTER.MESSAGES.${key}`, {
      entity: this.translate.instant('MAIN.FEATURES.PRODUCT_MASTER.ENTITIES.MARK'),
    });
  }
}
