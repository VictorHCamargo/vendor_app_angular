import { Component, computed, inject, signal } from '@angular/core';
import { BaseList } from '../../../../shared/class/base-list';
import { IColorModel } from '../interfaces/color-model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../../../shared/components/table/table';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ColorService } from '../services/color-service';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
import { Modal } from '../../../../shared/components/modal/modal';
import { ProductDeleteModal } from '../../../../shared/components/product-delete-modal/product-delete-modal';

@Component({
  selector: 'app-color-list',
  imports: [Table, TranslatePipe, Modal, ProductDeleteModal],
  templateUrl: './color-list.html',
  styleUrl: './color-list.scss',
})
export class ColorList extends BaseList<IColorModel> {
  private colorService = inject(ColorService);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private modalOpen = signal(false);
  openModal = computed(() => this.modalOpen());
  selected = signal<IColorModel | null>(null);

  constructor() {
    super();
    this.createData();
  }

  override createData(): void {
    const routeData = toSignal(this.route.data);

    const data = routeData()?.['data'];

    this.dataModel.set(data);

    this.configTable = computed(() => {
      return {
        data: this.dataModel(),
        buttons: [
          {
            name: 'COMMONS.EDIT',
            show: () => true,
            action: (data) => {
              this.router.navigate(['color', 'form', data.id]);
            },
            style: 'btn btn-primary',
          },
          {
            name: 'COMMONS.DELE',
            show: () => true,
            action: (data) => {
              this.selected.set(data);
              this.modalOpen.set(true);
            },
            style: 'btn btn-danger',
          },
        ],
        titles: [
          {
            name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.HEX',
            dataField: 'hexadecimal',
            transform: {
              type: 'make',
              function: (value: string) => {
                const spanConfig = `$class,d-inline-block rounded$style,width: 20px; height: 20px; background-color: ${value};$value,${value}`;

                return spanConfig;
              },
            },
          },
          {
            name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.ACTIVE',
            dataField: 'active',
            transform: {
              type: 'active',
              function: (value: boolean) => {
                return value;
              },
            },
          },
        ],
      };
    });
  }

  override reloadData(): void {
    this.colorService.search().subscribe((value) => {
      this.dataModel.set(value as IColorModel[]);
    });
  }

  override onNewRegister(): void {
    this.router.navigate(['color', 'form']);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  deleteSelected(): void {
    const item = this.selected();
    if (!item?.id) return;
    this.colorService.delete(item.id).subscribe({
      next: () => {
        this.reloadData();
        this.toastService.show(this.message('DELETE.SUCCESS'), 'success');
        this.closeModal();
      },
      error: () => {
        this.toastService.show(this.message('DELETE.ERROR'), 'danger');
        this.closeModal();
      },
    });
  }

  private message(key: string): string {
    return this.translate.instant(`MAIN.FEATURES.PRODUCT_MASTER.MESSAGES.${key}`, {
      entity: this.translate.instant('MAIN.FEATURES.PRODUCT_MASTER.ENTITIES.COLOR'),
    });
  }
}
